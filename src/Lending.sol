// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract LendingContract is Ownable {
    /**
     * @dev This contract allows user to register, add collateral and apply for 
     * loans with the collateral after verification
     */

    // Errors
    error ErrorInsufficientFund(); // custom error
    error ErrorTokenTranferFailed();
    error ErrorAmountShouldBeBetweenMinimumAndMaximumAmount(); // custom error
    error ErrorLoanDisbursed();
    error ErrorZeroAddressProvided();
    error ErrorInvestorNotFound();
    error ErrorNotEligibleToWithDraw();
    error ErrorUserAlreadyExisted();
    error ErrorLoanIsYetToBeDisbursed();
    error ErrorYouHaveExceededMaxLoanCollateralEligibility(uint loan_amount);
    error ErrorDurationMustBeLessThanOneYear();
    error ErrorCollateralDoesntExist();
    error ErrorLoanRepaid();
    error ErrorLoanNotRepaid();

    //events

    // Event
    event createLoanEvent(
        address indexed _borrower,
        //bytes32 agreement_hash,
        uint256 indexed loan_id,
        uint256 approved_amount
        //LoanPaymentType _paymentType
    );

    event disburseLoanEvent(
        bool loan_disbursed,
        address indexed borrower,
        uint256 indexed loan_id,
        uint amount,
        uint due_date
    );

    // Loan Requests
    event loanRequestEvent(
        bool loan_disbursed,
        bool repaid,
        address indexed borrower,
        uint amount,
        uint256 indexed collateral_id, //
        uint256 indexed loan_id,
        uint duration,
        uint due_date,
        uint total_amount_paid // total amount of money paid so far
    );

    // Payment Loan History event
    event loanRepaymentHistoryEvent(
        // new
        address indexed borrower,
        uint256 _loan_id,
        uint256 loan_amount,
        uint256 indexed loan_repayment_history_id
    );


    // investment event, when user deposited an amount
    event investmentEvent(
        address indexed investor,
        uint256 indexed total_amount,
        uint256 accumulated_interest,
        uint256 indexed withdrawal_date
    );

    event collateralEvent (
        address borrower,
        uint256 amount,
        bool active_loan,
        bool existed
    );


    // withdrawal event, when user withdraws their investment and profit
    event withdrawInvestmentEvent(
        address indexed investor,
        uint256 indexed total_amount_withdraw
    );

    // private counters
    uint256 private _loan_ids;
    uint256 private _collateral_ids;
    uint256 private _loan_repayment_history_ids;
    uint16 private immutable multiplier = 100;
    uint32 private immutable investment_period = 365 days;
    uint256 public immutable minimum_investment = 1 ether;
    uint256 public immutable current_eth_price = 2400;
    uint8 public s_loan_rate; // loans interest rate
    uint8 public s_investor_rate; // investors interest rates

    // The minimum and maximum amount of ETH that can be loaned
    // The minimum amount and max of USDe that can be deposited

    uint public constant MIN_COLLATERAL_AMOUNT = 5;
    uint public constant MAX_COLLATERAL_AMOUNT = 1000;

    // The percentage of additional loan they can get borrow
    uint public MAX_ADDITIONAL_LOAN = 50;

    //maximum repayment duration
    uint public MAX_LOAN_DURATION = 365 days;


    // USDe addresses
    address public s_usde_token_address;


    /// @notice The oracle contract
    // ISupraOraclePull internal oracle;


    struct InvestorInfo {
        address investor;
        uint256 total_amount;
        uint256 accumulated_interest;
        uint256 investment_date;
        uint256 withdrawal_date;
        bool existed;
    }

    struct Loan {
        bool loan_disbursed;
        bool repaid;
        address borrower;
        uint amount;
        uint256 collateral_id; //
        uint256 loan_id;
        uint duration;
        uint due_date;
        //uint repayment_amount;
        uint total_amount_paid; // total amount of money paid so far
    }

    struct Collateral {
        address borrower;
        uint256 amount;
        bool active_loan;
        bool existed;
    }

    mapping(address => mapping(uint256 => Loan)) public loanList;
    mapping(address => InvestorInfo) public investorList;
    mapping(address => mapping(uint256 => Collateral))
        private collateralList;

    modifier collateralDoesntExist(uint256 _collateral_id) {
        if (collateralList[msg.sender][_collateral_id].existed == false)
            revert ErrorCollateralDoesntExist();
        _;
    }

    //constructor
    constructor(uint8 _loan_rate, uint8 _investor_rate) Ownable(msg.sender) {
        s_loan_rate = _loan_rate;
        s_investor_rate = _investor_rate;
        //oracle = ISupraOraclePull(_oracle);
    }

    /**
     * loanRequest - request for a loan
     * Check if collateral existed using the property registration number
     */

    function addCollaterals() public payable returns (bool success) {
        if (msg.value < MIN_COLLATERAL_AMOUNT || msg.value > MAX_COLLATERAL_AMOUNT) revert ErrorAmountShouldBeBetweenMinimumAndMaximumAmount();
        if(IERC20(s_usde_token_address).transferFrom(msg.sender, address(this), msg.value)) revert ErrorTokenTranferFailed();
        collateralList[msg.sender][_collateral_ids] = Collateral(
            msg.sender,
            msg.value,
            false,
            true
        );
        emit collateralEvent(
            msg.sender,
            msg.value,
            false,
            true
        );
        return success;
    }



    function loanRequest(
        uint256 _collateral_id,
        uint _amount,
        uint _duration
    ) public collateralDoesntExist(_collateral_id) {
        // save Loan request information

        Collateral memory collateral = collateralList[msg.sender][_collateral_id];
        //calculate amount of loan users are eligible to 
        uint loan_amount = (collateral.amount * MAX_ADDITIONAL_LOAN / 100) + collateral.amount;
        if (_amount > loan_amount) revert ErrorYouHaveExceededMaxLoanCollateralEligibility(loan_amount);
        if(_duration > MAX_LOAN_DURATION) revert ErrorDurationMustBeLessThanOneYear();
        loanList[msg.sender][_loan_ids] = Loan(
            false,
            false,
            msg.sender,
            _amount,
            _collateral_id,
            _loan_ids,
            _duration,
            0,
            0
        );

        emit loanRequestEvent(
            false,
            false,
            msg.sender,
            _amount,
            _collateral_id,
            _loan_ids,
            _duration,
            0,
            0
        );

        _loan_ids++;

    }


    /**
     * paymentDisbursal - disburse loan to the borrower
     * Check if _borrower address is not zero address
     * @param _loan_id - The Id of the created loan
     */

    function withdrawLoan(
        uint256 _loan_id,
        uint256 _collateral_id
    ) public onlyOwner returns (bool success) {
        if (msg.sender == address(0)) revert ErrorZeroAddressProvided();
        if (loanList[msg.sender][_loan_id].loan_disbursed == true) revert ErrorLoanDisbursed();
        loanList[msg.sender][_loan_id].loan_disbursed = true;
        collateralList[msg.sender][_collateral_id].active_loan = true; 


        //calculate worth of USDe to eth
        payable(msg.sender).transfer(loanList[msg.sender][_loan_id].amount); //transfer just 1eth instead of amount_to_disburse, because we can’t afford it
        uint due_date = block.timestamp + loanList[msg.sender][_loan_id].duration;
        loanList[msg.sender][_loan_id].due_date = due_date;
        emit disburseLoanEvent(
            true,
            msg.sender,
            _loan_id,
            loanList[msg.sender][_loan_id].amount,
            due_date
        );
        return true;
    }


    /**
     * payLoan - pay loan
     * @param _loan_id - The Id of the created loan
     * @param _collateral_id - The Id of the created loan
     * Check the remaining balance to be paid in eth and if all had been paid, prevent user from paying loan
     */


    function payLoan(
        uint256 _loan_id,
        uint256 _collateral_id
    ) public payable returns (bool success) {
        uint total_amount_paid = loanList[msg.sender][_loan_id].total_amount_paid;
        uint amount = loanList[msg.sender][_loan_id].amount;
        if(loanList[msg.sender][_loan_id].loan_disbursed == false) revert ErrorLoanIsYetToBeDisbursed(); //loan is yet to be disbursed 
        if(loanList[msg.sender][_loan_id].repaid == false || total_amount_paid >= amount) revert ErrorLoanRepaid(); //loanrepaid
        loanList[msg.sender][_loan_id].total_amount_paid += msg.value;
        if((total_amount_paid + msg.value) >= amount){
            loanList[msg.sender][_loan_id].repaid = true;
            collateralList[msg.sender][_collateral_id].active_loan = false;
        }
        emit loanRepaymentHistoryEvent(
            msg.sender,
            _loan_id,
            msg.value,
            _loan_repayment_history_ids
        );
        _loan_repayment_history_ids++;
        return true;
    }

    function withdrawCollateral(
        uint256 _loan_id,
        uint256 _collateral_id)
    public payable returns(bool success) {
        if(loanList[msg.sender][_loan_id].repaid == false) revert ErrorLoanNotRepaid(); 
        if(collateralList[msg.sender][_loan_id].active_loan == true) revert ErrorLoanNotRepaid();

        return true; 
    }

    /**
     * Invest - Invest minimum 1 ether into the business
     *
     */
    function invest() public payable returns (bool success) {
        if (msg.value < minimum_investment) revert ErrorInsufficientFund();
        uint256 total = (msg.value * multiplier) / s_investor_rate;
        investorList[msg.sender] = InvestorInfo(
            msg.sender,
            msg.value,
            total / multiplier,
            block.timestamp,
            block.timestamp + investment_period,
            true
        );
        emit investmentEvent(
            msg.sender,
            msg.value,
            total / multiplier,
            block.timestamp + investment_period
        );
        return success;
    }

    /**
     * WithdrawInvestment - withdraw your investment after a year of investment
     * function check to see if investor existed
     * check to see if the timer is exactly a year and more, this to ensure user doesn’t attempt to withdraw before a year
     * check to see if the contract has sufficient amount for user to withdraw
     */
    function withdrawInvestment() public returns (bool) {
        if (investorList[msg.sender].existed == false)
            revert ErrorInvestorNotFound();
        if (investorList[msg.sender].withdrawal_date > block.timestamp)
            revert ErrorNotEligibleToWithDraw();
        uint256 total_amount_withdraw = investorList[msg.sender].total_amount +
            investorList[msg.sender].accumulated_interest;
        if (address(this).balance > total_amount_withdraw)
            revert ErrorInsufficientFund();
        investorList[msg.sender].total_amount = 0;
        investorList[msg.sender].accumulated_interest = 0;
        payable(msg.sender).transfer(total_amount_withdraw);
        emit withdrawInvestmentEvent(msg.sender, total_amount_withdraw);
        return true;
    }

    function getLoanInformation(
        address _borrower,
        uint256 _loan_id
    ) public view returns (Loan memory) {
        return loanList[_borrower][_loan_id];
    }


    function getInvestorInfo(
        address _investor
    ) public view returns (InvestorInfo memory) {
        return investorList[_investor];
    }

    function getAmountToBePaid(
        address _borrower,
        uint256 _loan_id
    ) public view returns (uint256) {
        return
            loanList[_borrower][_loan_id].amount +
            (loanList[_borrower][_loan_id].amount / s_loan_rate);
    }

    receive() external payable {
        this.invest();
    }
}

