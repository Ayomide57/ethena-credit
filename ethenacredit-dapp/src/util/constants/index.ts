import { ethenacreditAddress, USDe, sUSDe } from "./contractAddresses";

import { narrow } from 'abitype';

const ethenacreditAbi = narrow(
  [{"type":"constructor","inputs":[{"name":"_usde_token_address","type":"address","internalType":"address"},{"name":"_susde_token_address","type":"address","internalType":"address"},{"name":"_pyth_contract","type":"address","internalType":"address"},{"name":"_priceFeedId","type":"bytes32","internalType":"bytes32"},{"name":"_investor_rate","type":"uint8","internalType":"uint8"}],"stateMutability":"nonpayable"},{"type":"receive","stateMutability":"payable"},{"type":"function","name":"MAX_COLLATERAL_AMOUNT","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"MAX_LOAN_DURATION","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"MIN_COLLATERAL_AMOUNT","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"_collateral_ids","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"_investment_ids","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"_loan_ids","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"_loan_repayment_history_ids","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"addCollateral","inputs":[{"name":"_amount","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"success","type":"bool","internalType":"bool"}],"stateMutability":"payable"},{"type":"function","name":"collateralList","inputs":[{"name":"","type":"address","internalType":"address"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"active_loan","type":"bool","internalType":"bool"},{"name":"existed","type":"bool","internalType":"bool"},{"name":"borrower","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"},{"name":"collateral_id","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"cooldownAssetsUSDe","inputs":[{"name":"_amount","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"success","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"},{"type":"function","name":"getInvestorInfo","inputs":[{"name":"_investor","type":"address","internalType":"address"},{"name":"_investment_id","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"tuple","internalType":"struct EthenaCredit.InvestorInfo","components":[{"name":"investor","type":"address","internalType":"address"},{"name":"total_amount","type":"uint256","internalType":"uint256"},{"name":"accumulated_interest","type":"uint256","internalType":"uint256"},{"name":"investment_date","type":"uint256","internalType":"uint256"},{"name":"withdrawal_date","type":"uint256","internalType":"uint256"},{"name":"investment_id","type":"uint256","internalType":"uint256"},{"name":"paid","type":"bool","internalType":"bool"},{"name":"existed","type":"bool","internalType":"bool"}]}],"stateMutability":"view"},{"type":"function","name":"getLoanInformation","inputs":[{"name":"_borrower","type":"address","internalType":"address"},{"name":"_loan_id","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"tuple","internalType":"struct EthenaCredit.Loan","components":[{"name":"loan_disbursed","type":"bool","internalType":"bool"},{"name":"repaid","type":"bool","internalType":"bool"},{"name":"existed","type":"bool","internalType":"bool"},{"name":"borrower","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"},{"name":"collateral_id","type":"uint256","internalType":"uint256"},{"name":"loan_id","type":"uint256","internalType":"uint256"},{"name":"duration","type":"uint256","internalType":"uint256"},{"name":"due_date","type":"uint256","internalType":"uint256"},{"name":"total_amount_paid","type":"uint256","internalType":"uint256"}]}],"stateMutability":"view"},{"type":"function","name":"invest","inputs":[{"name":"_amount","type":"uint256","internalType":"uint256"},{"name":"_duration","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"success","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"},{"type":"function","name":"investorList","inputs":[{"name":"","type":"address","internalType":"address"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"investor","type":"address","internalType":"address"},{"name":"total_amount","type":"uint256","internalType":"uint256"},{"name":"accumulated_interest","type":"uint256","internalType":"uint256"},{"name":"investment_date","type":"uint256","internalType":"uint256"},{"name":"withdrawal_date","type":"uint256","internalType":"uint256"},{"name":"investment_id","type":"uint256","internalType":"uint256"},{"name":"paid","type":"bool","internalType":"bool"},{"name":"existed","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"loanList","inputs":[{"name":"","type":"address","internalType":"address"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"loan_disbursed","type":"bool","internalType":"bool"},{"name":"repaid","type":"bool","internalType":"bool"},{"name":"existed","type":"bool","internalType":"bool"},{"name":"borrower","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"},{"name":"collateral_id","type":"uint256","internalType":"uint256"},{"name":"loan_id","type":"uint256","internalType":"uint256"},{"name":"duration","type":"uint256","internalType":"uint256"},{"name":"due_date","type":"uint256","internalType":"uint256"},{"name":"total_amount_paid","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"loanRequest","inputs":[{"name":"_collateral_id","type":"uint256","internalType":"uint256"},{"name":"_amount","type":"uint256","internalType":"uint256"},{"name":"_duration","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"minimum_investment","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"minimum_investment_period","inputs":[],"outputs":[{"name":"","type":"uint32","internalType":"uint32"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"payLoan","inputs":[{"name":"_loan_id","type":"uint256","internalType":"uint256"},{"name":"_collateral_id","type":"uint256","internalType":"uint256"},{"name":"_amount","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"success","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"},{"type":"function","name":"renounceOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"s_investor_rate","inputs":[],"outputs":[{"name":"","type":"uint8","internalType":"uint8"}],"stateMutability":"view"},{"type":"function","name":"s_max_loan_rate","inputs":[],"outputs":[{"name":"","type":"uint8","internalType":"uint8"}],"stateMutability":"view"},{"type":"function","name":"s_susde_token_address","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"s_usde_token_address","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"transferOwnership","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"unstakeAssetsUSDe","inputs":[],"outputs":[{"name":"success","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"},{"type":"function","name":"updatePrice","inputs":[{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"withdrawCollateral","inputs":[{"name":"_collateral_id","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"success","type":"bool","internalType":"bool"}],"stateMutability":"payable"},{"type":"function","name":"withdrawInvestment","inputs":[{"name":"_investment_id","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"},{"type":"function","name":"withdrawLoan","inputs":[{"name":"_loan_id","type":"uint256","internalType":"uint256"},{"name":"_collateral_id","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"success","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"collateralEvent","inputs":[{"name":"active_loan","type":"bool","indexed":false,"internalType":"bool"},{"name":"existed","type":"bool","indexed":false,"internalType":"bool"},{"name":"borrower","type":"address","indexed":false,"internalType":"address"},{"name":"amount","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"collateral_id","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"createLoanEvent","inputs":[{"name":"_borrower","type":"address","indexed":true,"internalType":"address"},{"name":"loan_id","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"approved_amount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"disburseLoanEvent","inputs":[{"name":"loan_disbursed","type":"bool","indexed":false,"internalType":"bool"},{"name":"borrower","type":"address","indexed":true,"internalType":"address"},{"name":"loan_id","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"amount","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"due_date","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"investmentEvent","inputs":[{"name":"investor","type":"address","indexed":true,"internalType":"address"},{"name":"total_amount","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"accumulated_interest","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"withdrawal_date","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"investment_id","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"loanRepaymentHistoryEvent","inputs":[{"name":"borrower","type":"address","indexed":true,"internalType":"address"},{"name":"loan_id","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"loan_amount","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"loan_repayment_history_id","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"loanRequestEvent","inputs":[{"name":"loan_disbursed","type":"bool","indexed":false,"internalType":"bool"},{"name":"repaid","type":"bool","indexed":false,"internalType":"bool"},{"name":"borrower","type":"address","indexed":true,"internalType":"address"},{"name":"amount","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"collateral_id","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"loan_id","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"duration","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"due_date","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"total_amount_paid","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"withdrawInvestmentEvent","inputs":[{"name":"investor","type":"address","indexed":true,"internalType":"address"},{"name":"total_amount_withdraw","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"paid","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"error","name":"ErrorAccountNotFound","inputs":[]},{"type":"error","name":"ErrorAmountShouldBeBetweenMinimumAndMaximumAmount","inputs":[{"name":"amount","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ErrorCollateralDoesntExist","inputs":[]},{"type":"error","name":"ErrorDurationMustBeLessThanOneYear","inputs":[]},{"type":"error","name":"ErrorInsufficientFund","inputs":[]},{"type":"error","name":"ErrorInvestmentDurationMustMoreThanAMonth","inputs":[]},{"type":"error","name":"ErrorInvestmentRepaid","inputs":[]},{"type":"error","name":"ErrorInvestorNotFound","inputs":[]},{"type":"error","name":"ErrorLoanDisbursed","inputs":[]},{"type":"error","name":"ErrorLoanIsYetToBeDisbursed","inputs":[]},{"type":"error","name":"ErrorLoanNotRepaid","inputs":[]},{"type":"error","name":"ErrorLoanRepaid","inputs":[]},{"type":"error","name":"ErrorNotEligibleToWithDraw","inputs":[]},{"type":"error","name":"ErrorTokenTranferFailed","inputs":[]},{"type":"error","name":"ErrorUserAlreadyExisted","inputs":[]},{"type":"error","name":"ErrorYouHaveExceededMaxLoanCollateralEligibility","inputs":[{"name":"loan_amount","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ErrorZeroAddressProvided","inputs":[]},{"type":"error","name":"OwnableInvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"}]}]
);
const usdeAbi = narrow(
  [{"inputs":[{"internalType":"address","name":"admin","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"CantRenounceOwnership","type":"error"},{"inputs":[],"name":"InvalidShortString","type":"error"},{"inputs":[],"name":"OnlyMinter","type":"error"},{"inputs":[{"internalType":"string","name":"str","type":"string"}],"name":"StringTooLong","type":"error"},{"inputs":[],"name":"ZeroAddressException","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[],"name":"EIP712DomainChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newMinter","type":"address"},{"indexed":true,"internalType":"address","name":"oldMinter","type":"address"}],"name":"MinterUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"eip712Domain","outputs":[{"internalType":"bytes1","name":"fields","type":"bytes1"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"version","type":"string"},{"internalType":"uint256","name":"chainId","type":"uint256"},{"internalType":"address","name":"verifyingContract","type":"address"},{"internalType":"bytes32","name":"salt","type":"bytes32"},{"internalType":"uint256[]","name":"extensions","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"minter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newMinter","type":"address"}],"name":"setMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
)
export { ethenacreditAbi, ethenacreditAddress, usdeAbi, USDe, sUSDe }