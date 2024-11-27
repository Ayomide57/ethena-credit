// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";
import {console} from "forge-std/Script.sol";


contract EthenaCreditBle is Ownable {
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
    error ErrorInvestmentDurationMustMoreThanAMonth();
    error ErrorCollateralDoesntExist();
    error ErrorLoanRepaid();
    error ErrorLoanNotRepaid();
    error ErrorInvestmentRepaid();
    error ErrorAccountNotFound();


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
        uint256 indexed loan_id,
        uint256 loan_amount,
        uint256 indexed loan_repayment_history_id
    );


    // investment event, when user deposited an amount
    event investmentEvent(
        address indexed investor,
        uint256 indexed total_amount,
        uint256 accumulated_interest,
        uint256 withdrawal_date,
        uint256 indexed investment_id
    );

    event collateralEvent (
        bool active_loan,
        bool existed,
        address borrower,
        uint256 amount,
        uint256 collateral_id
    );


    // withdrawal event, when user withdraws their investment and profit
    event withdrawInvestmentEvent(
        address indexed investor,
        uint256 indexed total_amount_withdraw,
        bool paid
    );

    // private counters
    uint256 public _loan_ids;
    uint256 public _collateral_ids;
    uint256 public _loan_repayment_history_ids;
    uint256 public _investment_ids;
    uint8 private immutable multiplier = 100;
    uint32 public minimum_investment_period = 30 days;
    uint256 public minimum_investment = 1 ether;
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
    // IPyth oracle;
    IPyth internal pyth;
    bytes32 internal priceFeedId;


    struct InvestorInfo {
        address investor;
        uint256 total_amount;
        uint256 accumulated_interest;
        uint256 investment_date;
        uint256 withdrawal_date;
        uint256 investment_id;
        bool paid;
        bool existed;
    }

    struct Loan {
        bool loan_disbursed;
        bool repaid;
        bool existed;
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
        bool active_loan;
        bool existed;
        address borrower;
        uint256 amount;
        uint256 collateral_id; 
    }

    struct SendParam {
        uint32 dstEid; // Destination endpoint ID.
        bytes32 to; // Recipient address.
        uint256 amountLD; // Amount to send in local decimals.
        uint256 minAmountLD; // Minimum amount to send in local decimals.
        bytes extraOptions; // Additional options supplied by the caller to be used in the LayerZero message.
        bytes composeMsg; // The composed message for the send() operation.
        bytes oftCmd; // The OFT command to be executed, unused in default OFT implementations.
    }

    struct MessagingFee {
        uint256 nativeFee; // Fee amount in native gas token.
        uint256 lzTokenFee; // Fee amount in ZRO token.
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
    constructor(address _usde_token_address, address _susde_token_address, address _pyth_contract, bytes32 _priceFeedId, uint8 _investor_rate) Ownable(msg.sender) {
        s_usde_token_address = _usde_token_address;
        s_susde_token_address = _susde_token_address;
        s_investor_rate = _investor_rate;
        pyth = IPyth(_pyth_contract);
        priceFeedId = _priceFeedId;
    }

    /**
     * addCollateral - add users collateral (USDe) 
     * Check if collateral existed using the property registration number
     * @param _amount - collateral amount
     */

    function addCollateral(uint256 _amount) payable external returns (bool success) {
        if(_amount < MIN_COLLATERAL_AMOUNT && _amount > MAX_COLLATERAL_AMOUNT) revert ErrorAmountShouldBeBetweenMinimumAndMaximumAmount(_amount);
        require(IERC20(s_usde_token_address).transferFrom(msg.sender, address(this), _amount), "Transfer Failed");
        //(bool sent, )= s_susde_token_address.call{value: _amount}(abi.encodeWithSignature("deposit(uint256,address)", _amount, address(this)));
        //if(!sent) revert ErrorTokenTranferFailed();
        collateralList[msg.sender][_collateral_ids] = Collateral(
            false,
            true,
            msg.sender,
            _amount,
            _collateral_ids
        );
        emit collateralEvent(
            false,
            true,
            msg.sender,
            _amount,
            _collateral_ids
        );
        _collateral_ids ++;
        return success;
    }


    /**
     * loanRequest - users request for a specific amount of loan, max is collateral + collateral/2 (50%) 
     * Check if amount is within eligible amount users can borrow collateral + collateral/2
     * Check if duration user provided greater than contract max loan duration
     *  
     * @param _collateral_id - The collateral Id
     * @param _amount - loan amount
     * @param _duration - The loan duration
     */

    function loanRequest(
        uint256 _collateral_id,
        uint256 _amount,
        uint256 _duration
    ) external collateralDoesntExist(_collateral_id) {
        // save Loan request information

        Collateral memory collateral = collateralList[msg.sender][_collateral_id];
        //calculate amount of loan users are eligible to 
        uint max_loan_amount = (collateral.amount * s_max_loan_rate / multiplier) + collateral.amount;

        if (_amount > max_loan_amount) revert ErrorYouHaveExceededMaxLoanCollateralEligibility(max_loan_amount);
        if(_duration > MAX_LOAN_DURATION) revert ErrorDurationMustBeLessThanOneYear();
        loanList[msg.sender][_loan_ids] = Loan(
            false,
            false,
            true,
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
     * check if loan had been previously disbursed i.e false and set disburse to true 
     * @param _loan_id - The Id of the created loan
     * @param _collateral_id - The Id of user's collateral
     */

    function withdrawLoan(
        uint256 _loan_id,
        uint256 _collateral_id
    ) external returns (bool success) {
        if (msg.sender == address(0)) revert ErrorZeroAddressProvided();/// @note: wrong check no need  
        if (loanList[msg.sender][_loan_id].existed == false) revert ErrorAccountNotFound();
        if (loanList[msg.sender][_loan_id].loan_disbursed == true) revert ErrorLoanDisbursed();
        loanList[msg.sender][_loan_id].loan_disbursed = true;
        collateralList[msg.sender][_collateral_id].active_loan = true; 

        //calculate worth of USDe to eth
        uint256 loan_amount = loanList[msg.sender][_loan_id].amount;
        //console.log(loan_amount);
        uint256 ethPrice = this.updatePrice(loan_amount);
        //console.log(ethPrice);
        IERC20(s_usde_token_address).approve(address(s_susde_token_address), loan_amount);
        (bool sent, bytes memory data) = s_susde_token_address.call(abi.encodeWithSignature("deposit(uint256,address)", loan_amount, address(this)));
        if(!sent) revert ErrorTokenTranferFailed();

        payable(loanList[msg.sender][_loan_id].borrower).transfer(ethPrice); // @note : use low level call syntax
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
     * @param _loan_id - The Id user's loan
     * @param _collateral_id - The Id of user's collateral
     * Check the remaining balance to be paid in eth and if all had been paid, prevent user from paying loan
     * check if loan had been disbursed
     */


    function payLoan(
        uint256 _loan_id,
        uint256 _collateral_id,
        uint256 _amount
    ) external returns (bool success) {
        // @note : i think the user have to repay the eth or the borrowed token , here we are taking the collateral token which is not right

        uint total_amount_paid = loanList[msg.sender][_loan_id].total_amount_paid;
        uint amount = loanList[msg.sender][_loan_id].amount;
        if(loanList[msg.sender][_loan_id].loan_disbursed == false) revert ErrorLoanIsYetToBeDisbursed(); //loan is yet to be disbursed 
        if(loanList[msg.sender][_loan_id].repaid == true || total_amount_paid >= amount) revert ErrorLoanRepaid(); //loanrepaid
        require(IERC20(s_usde_token_address).transferFrom(msg.sender, address(this), _amount), "Transfer Failed");
        loanList[msg.sender][_loan_id].total_amount_paid += _amount;
        if((total_amount_paid + _amount) >= amount){
            loanList[msg.sender][_loan_id].repaid = true;
            collateralList[msg.sender][_collateral_id].active_loan = false;
        }
        emit loanRepaymentHistoryEvent(
            msg.sender,
            _loan_id,
            _amount,
            _loan_repayment_history_ids
        );
        _loan_repayment_history_ids++;
        return true;
    }

    /**
     * withdrawCollateral - function to withdraw user's collateral
     * @param _collateral_id - Collateral ID
     * check if this particular collateral active
     * delete collateral after user withdraws collateral
     */

    function withdrawCollateral(
        //uint256 _loan_id,
        uint256 _collateral_id)
    public payable returns(bool success) {
        //if(loanList[msg.sender][_loan_id].repaid == false) revert ErrorLoanNotRepaid(); 
        if(collateralList[msg.sender][_collateral_id].active_loan) revert ErrorLoanNotRepaid();
        uint total_amount_to_withdraw = collateralList[msg.sender][_collateral_id].amount;
        collateralList[msg.sender][_collateral_id].active_loan = false;
        delete collateralList[msg.sender][_collateral_id];
        require(IERC20(s_usde_token_address).transfer(msg.sender, total_amount_to_withdraw), "Transfer Failed");
        return true; 
    }

    /**
     * Invest - Invest minimum 1 ether into the business
     * @param _amount - Investment amount
     * @param _duration - The duration of the investment
     * Check if amount is less than the minimum invesment amount
     * check to see if the duration is higher than now and higher or equal to 30 days
     */
    function invest(uint _amount, uint256 _duration) external returns (bool success) {
        if (_amount < minimum_investment) revert ErrorInsufficientFund();
        if (block.timestamp + minimum_investment_period <= block.timestamp + _duration) revert ErrorInvestmentDurationMustMoreThanAMonth();
        require(IERC20(s_usde_token_address).transferFrom(msg.sender, address(this), _amount), "Transfer Failed");
        IERC20(s_usde_token_address).approve(address(s_susde_token_address), _amount);
        (bool sent, bytes memory data) = s_susde_token_address.call(abi.encodeWithSignature("deposit(uint256,address)", _amount, address(this)));
        if(!sent) revert ErrorTokenTranferFailed();

        uint256 total = (_amount * multiplier) / s_investor_rate;
        investorList[msg.sender][_investment_ids] = InvestorInfo(
            msg.sender,
            _amount,
            total / multiplier,
            block.timestamp,
            block.timestamp + _duration,
            _investment_ids,
            false,
            true
        );
        emit investmentEvent(
            msg.sender,
            _amount,
            total / multiplier,
            block.timestamp + _duration,
            _investment_ids
        );
        _investment_ids++;
        return success;
    }

    /**
     * WithdrawInvestment - withdraw your investment after a year of investment
     * @param _investment_id - Investment Id
     * function check to see if investor existed or invested into the protocol
     * check to see if the withdrawal_date greater than current time stamp, if withdrawal date is due
     * check if the investment had been paid
     * check to see if the contract has sufficient amount for user to withdraw
     */
    function withdrawInvestment(
        uint256 _investment_id
    ) public returns (bool) {
        if (investorList[msg.sender][_investment_id].existed == false)
            revert ErrorInvestorNotFound();
        if (investorList[msg.sender][_investment_id].withdrawal_date > block.timestamp)
            revert ErrorNotEligibleToWithDraw();
        if (investorList[msg.sender][_investment_id].paid)
            revert ErrorInvestmentRepaid();
        uint256 total_amount_to_withdraw = investorList[msg.sender][_investment_id].total_amount +
            investorList[msg.sender][_investment_id].accumulated_interest;
        if (address(this).balance > total_amount_to_withdraw)
            revert ErrorInsufficientFund();

        investorList[msg.sender][_investment_id].total_amount = 0;
        investorList[msg.sender][_investment_id].accumulated_interest = 0;
        investorList[msg.sender][_investment_id].paid = true;
        require(IERC20(s_usde_token_address).transfer(msg.sender, total_amount_to_withdraw), "Transfer Failed");

        emit withdrawInvestmentEvent(msg.sender, total_amount_to_withdraw, true);
        return true;
    }

    /**
     * cooldownAssetsUSDe - withdraw your investment after a year of investment
     * @param _amount - Amount to cool down
     * function cools down asset, essential prepare assets withrawal
     * only owner can call this function
     */

    function cooldownAssetsUSDe(uint256 _amount) onlyOwner public returns(bool success){
        (bool sent, bytes memory data) = s_susde_token_address.call(abi.encodeWithSignature("cooldownAssets(uint256)", _amount));
        //console.logBytes(data);
        require(sent , "failed");
        return sent;
    }

    /**
     * unstakeAssetsUSDe - withdraw your investment after a year of investment
     * function unstake sUSDe Asset
     * only owner can call this function
     */


    function unstakeAssetsUSDe() onlyOwner public returns(bool success){
        (bool sent, bytes memory data) = s_susde_token_address.call(abi.encodeWithSignature("unstake(address)", address(this)));
        //console.logBytes(data);
        require(sent , "failed");
        return sent;
    }


    //function updatePrice(bytes[] calldata pythPriceUpdate) external {
    function updatePrice(uint256 amount) view external returns(uint256) {
        //uint updateFee = pyth.getUpdateFee(pythPriceUpdate);
        //pyth.updatePriceFeeds{ value: updateFee }(pythPriceUpdate);
        PythStructs.Price memory price = pyth.getPriceNoOlderThan(priceFeedId, 360000);
        uint ethPrice18Decimals = (uint(uint64(price.price)) * (10 ** 18)) /
        (10 ** uint8(uint32(-1 * price.expo)));
        uint usdeValue = ethPrice18Decimals / amount;
        uint usde_eth_value = 1 ether / usdeValue ;
        return usde_eth_value;
    }


    function quoteSend(
        uint32 _dstEid, 
        bytes32 _to, 
        uint256 _amountLD, 
        uint256 _minAmountLD, 
        bytes memory _extraOptions, 
        bytes memory _composeMsg, 
        bytes memory _oftCmd, 
        bool _payInLzToken
    ) public returns(bool success){
        SendParam memory sendParam = SendParam(_dstEid, _to, _minAmountLD, _amountLD, _extraOptions, _composeMsg, _oftCmd);
        (bool sent, bytes memory data) = s_usde_token_address.call(
            abi.encodeWithSignature("quoteSend((uint32, bytes32, uint256, uint256, bytes, bytes, bytes), bool)", 
            sendParam, _payInLzToken
            ));
        console.logBytes(data);
        return sent;
    }

    function send(
        uint32 _dstEid, 
        bytes32 _to, 
        uint256 _amountLD, 
        uint256 _minAmountLD, 
        bytes memory _extraOptions, 
        bytes memory _composeMsg, 
        bytes memory _oftCmd,  
        address _dstAddress     
    ) onlyOwner public returns(bool success){
        SendParam memory sendParam = SendParam(_dstEid, _to, _minAmountLD, _amountLD,_extraOptions ,_composeMsg,_oftCmd);
        //MessagingFee memory fee = this.quoteSend(_dstEid, _to, _minAmountLD, _amountLD,_extraOptions ,_composeMsg,_oftCmd, _payInLzToken); 
        (bool sent, bytes memory data) = s_usde_token_address.call(
            abi.encodeWithSignature("send((uint32, bytes32, uint256, uint256, bytes, bytes, bytes), (uint256, uint256),address)", 
            sendParam, _dstAddress, _dstAddress
            ));
        console.logBytes(data);
        return sent;
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
