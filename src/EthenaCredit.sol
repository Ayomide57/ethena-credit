// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract EthenaCredit is Ownable {
    /**
     * @dev This contract allows user to register, add collateral and apply for 
     * loans with the collateral after verification
     */

    // Errors
    error ErrorInsufficientFund(); // custom error
    error ErrorTokenTranferFailed();
    error ErrorAmountShouldBeBetweenMinimumAndMaximumAmount(uint amount); // custom error
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
    uint256 public _loan_ids;
    uint256 public _collateral_ids;
    uint256 public _loan_repayment_history_ids;
    uint256 public _investment_ids;
    uint8 private immutable multiplier = 100;
    uint32 private immutable investment_period = 365 days;
    uint256 public immutable minimum_investment = 1 ether;
        // The percentage of additional loan they can get borrow
    uint8 public s_max_loan_rate = 50; // loans interest rate
    uint8 public s_investor_rate; // investors interest rates

    // The minimum and maximum amount of ETH that can be loaned
    // The minimum amount and max of USDe that can be deposited

    uint public MIN_COLLATERAL_AMOUNT = 5 ether;
    uint public MAX_COLLATERAL_AMOUNT = 1000 ether;

    //maximum repayment duration
    uint public MAX_LOAN_DURATION = 365 days;


    // USDe addresses
    address public s_usde_token_address;
    // sUSDe addresses
    address public s_susde_token_address;


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
    mapping(address => mapping(uint256 => InvestorInfo)) public investorList;
    mapping(address => mapping(uint256 => Collateral))
        public collateralList;

    modifier collateralDoesntExist(uint256 _collateral_id) {
        if (collateralList[msg.sender][_collateral_id].existed == false)
            revert ErrorCollateralDoesntExist();
        _;
    }

    //constructor
    constructor(address _usde_token_address, address _susde_token_address, uint8 _investor_rate) Ownable(msg.sender) {
        s_usde_token_address = _usde_token_address;
        s_susde_token_address = _susde_token_address;
        s_investor_rate = _investor_rate;
        //oracle = ISupraOraclePull(_oracle);
    }

    /**
     * loanRequest - request for a loan
     * Check if collateral existed using the property registration number
     * Call approvesUSDeToSpendUSDe when user add collateral and deposit users token using contract address 
     */

    function addCollateral(uint256 _amount) external returns (bool success) {
        if(_amount < MIN_COLLATERAL_AMOUNT && _amount > MAX_COLLATERAL_AMOUNT) revert ErrorAmountShouldBeBetweenMinimumAndMaximumAmount(_amount);

        //require(IERC20(s_usde_token_address).transferFrom(msg.sender, address(this), amount), "Transfer Failed");
        (bool sent, )= s_susde_token_address.call{value: _amount}(abi.encodeWithSignature("deposit(uint256,address)", _amount, address(this)));
        if(!sent) revert ErrorTokenTranferFailed();
        collateralList[msg.sender][_collateral_ids] = Collateral(
            msg.sender,
            _amount,
            false,
            true
        );
        emit collateralEvent(
            msg.sender,
            _amount,
            false,
            true
        );
        return success;
    }



    function loanRequest(
        uint256 _collateral_id,
        uint _amount,
        uint _duration
    ) external collateralDoesntExist(_collateral_id) {
        // save Loan request information

        Collateral memory collateral = collateralList[msg.sender][_collateral_id];
        //calculate amount of loan users are eligible to 
        uint loan_amount = (collateral.amount * s_max_loan_rate / multiplier) + collateral.amount;
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
    ) external onlyOwner returns (bool success) {
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
    ) external payable returns (bool success) {
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
        if(collateralList[msg.sender][_collateral_id].active_loan == true) revert ErrorLoanNotRepaid();

        return true; 
    }

    /**
     * Invest - Invest minimum 1 ether into the business
     *
     */
    function invest(uint _amount, uint256 _duration) external returns (bool success) {
        if (_amount < minimum_investment) revert ErrorInsufficientFund();
        //require(IERC20(s_usde_token_address).transferFrom(msg.sender, address(this), _amount), "Transfer Failed");
        (bool sent, )= s_susde_token_address.call{value: _amount}(abi.encodeWithSignature("deposit(uint256,address)", _amount, address(this)));
        if(!sent) revert ErrorTokenTranferFailed();

        uint256 total = (_amount * multiplier) / s_investor_rate;
        investorList[msg.sender][_investment_ids] = InvestorInfo(
            msg.sender,
            _amount,
            total / multiplier,
            block.timestamp,
            block.timestamp + _duration,
            true
        );
        emit investmentEvent(
            msg.sender,
            _amount,
            total / multiplier,
            block.timestamp + _duration
        );
        return success;
    }

    /**
     * WithdrawInvestment - withdraw your investment after a year of investment
     * function check to see if investor existed
     * check to see if the timer is exactly a year and more, this to ensure user doesn’t attempt to withdraw before a year
     * check to see if the contract has sufficient amount for user to withdraw
     */
    function withdrawInvestment(
        uint256 _investment_id
    ) public returns (bool) {
        if (investorList[msg.sender][_investment_id].existed == false)
            revert ErrorInvestorNotFound();
        if (investorList[msg.sender][_investment_id].withdrawal_date > block.timestamp)
            revert ErrorNotEligibleToWithDraw();
        uint256 total_amount_to_withdraw = investorList[msg.sender][_investment_id].total_amount +
            investorList[msg.sender][_investment_id].accumulated_interest;
        if (address(this).balance > total_amount_to_withdraw)
            revert ErrorInsufficientFund();
        investorList[msg.sender][_investment_id].total_amount = 0;
        investorList[msg.sender][_investment_id].accumulated_interest = 0;
        (bool cooldown, )= s_susde_token_address.call{value: total_amount_to_withdraw}(abi.encodeWithSignature("cooldownAssets(uint256)", total_amount_to_withdraw));
        if(cooldown) revert ErrorTokenTranferFailed(); //cool down failed
        (bool unstake, )= s_susde_token_address.call(abi.encodeWithSignature("unstake(address)", msg.sender));
        if(unstake) revert ErrorTokenTranferFailed(); //unstake failed
        //payable(address(this)).transfer(total_amount_to_withdraw);
        emit withdrawInvestmentEvent(msg.sender, total_amount_to_withdraw);
        return true;
    }
    

    function getLoanInformation(
        address _borrower,
        uint256 _loan_id
    ) public view returns (Loan memory) {
        return loanList[_borrower][_loan_id];
    }


    function getInvestorInfo(
        address _investor,
        uint256 _investment_id
    ) public view returns (InvestorInfo memory) {
        return investorList[_investor][_investment_id];
    }


    receive() external payable {
        //this.invest(msg.value);
    }
}

