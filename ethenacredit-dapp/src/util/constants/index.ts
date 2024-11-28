import { ethenacreditAddress, USDe, sUSDe } from "./contractAddresses";

import { narrow } from "abitype";

const ethenacreditAbi = narrow([
  {
    type: "constructor",
    inputs: [
      { name: "_usde_token_address", type: "address", internalType: "address" },
      {
        name: "_susde_token_address",
        type: "address",
        internalType: "address",
      },
      { name: "_pyth_contract", type: "address", internalType: "address" },
      { name: "_priceFeedId", type: "bytes32", internalType: "bytes32" },
      { name: "_investor_rate", type: "uint8", internalType: "uint8" },
    ],
    stateMutability: "nonpayable",
  },
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    name: "MAX_COLLATERAL_AMOUNT",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MAX_LOAN_DURATION",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MIN_COLLATERAL_AMOUNT",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "_collateral_ids",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "_investment_ids",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "_loan_ids",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "_loan_repayment_history_ids",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "addCollateral",
    inputs: [{ name: "_amount", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "success", type: "bool", internalType: "bool" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "collateralList",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "active_loan", type: "bool", internalType: "bool" },
      { name: "existed", type: "bool", internalType: "bool" },
      { name: "borrower", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
      { name: "collateral_id", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "cooldownAssetsUSDe",
    inputs: [{ name: "_amount", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "success", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getInvestorInfo",
    inputs: [
      { name: "_investor", type: "address", internalType: "address" },
      { name: "_investment_id", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct EthenaCredit.InvestorInfo",
        components: [
          { name: "investor", type: "address", internalType: "address" },
          { name: "total_amount", type: "uint256", internalType: "uint256" },
          {
            name: "accumulated_interest",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "investment_date", type: "uint256", internalType: "uint256" },
          { name: "withdrawal_date", type: "uint256", internalType: "uint256" },
          { name: "investment_id", type: "uint256", internalType: "uint256" },
          { name: "paid", type: "bool", internalType: "bool" },
          { name: "existed", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLoanInformation",
    inputs: [
      { name: "_borrower", type: "address", internalType: "address" },
      { name: "_loan_id", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct EthenaCredit.Loan",
        components: [
          { name: "loan_disbursed", type: "bool", internalType: "bool" },
          { name: "repaid", type: "bool", internalType: "bool" },
          { name: "existed", type: "bool", internalType: "bool" },
          { name: "borrower", type: "address", internalType: "address" },
          { name: "amount", type: "uint256", internalType: "uint256" },
          { name: "collateral_id", type: "uint256", internalType: "uint256" },
          { name: "loan_id", type: "uint256", internalType: "uint256" },
          { name: "duration", type: "uint256", internalType: "uint256" },
          { name: "due_date", type: "uint256", internalType: "uint256" },
          {
            name: "total_amount_paid",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "invest",
    inputs: [
      { name: "_amount", type: "uint256", internalType: "uint256" },
      { name: "_duration", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "success", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "investorList",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "investor", type: "address", internalType: "address" },
      { name: "total_amount", type: "uint256", internalType: "uint256" },
      {
        name: "accumulated_interest",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "investment_date", type: "uint256", internalType: "uint256" },
      { name: "withdrawal_date", type: "uint256", internalType: "uint256" },
      { name: "investment_id", type: "uint256", internalType: "uint256" },
      { name: "paid", type: "bool", internalType: "bool" },
      { name: "existed", type: "bool", internalType: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "loanList",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "loan_disbursed", type: "bool", internalType: "bool" },
      { name: "repaid", type: "bool", internalType: "bool" },
      { name: "existed", type: "bool", internalType: "bool" },
      { name: "borrower", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
      { name: "collateral_id", type: "uint256", internalType: "uint256" },
      { name: "loan_id", type: "uint256", internalType: "uint256" },
      { name: "duration", type: "uint256", internalType: "uint256" },
      { name: "due_date", type: "uint256", internalType: "uint256" },
      { name: "total_amount_paid", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "loanRequest",
    inputs: [
      { name: "_collateral_id", type: "uint256", internalType: "uint256" },
      { name: "_amount", type: "uint256", internalType: "uint256" },
      { name: "_duration", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "minimum_investment",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "minimum_investment_period",
    inputs: [],
    outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "payLoan",
    inputs: [
      { name: "_loan_id", type: "uint256", internalType: "uint256" },
      { name: "_collateral_id", type: "uint256", internalType: "uint256" },
      { name: "_amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "success", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "s_investor_rate",
    inputs: [],
    outputs: [{ name: "", type: "uint8", internalType: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "s_max_loan_rate",
    inputs: [],
    outputs: [{ name: "", type: "uint8", internalType: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "s_susde_token_address",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "s_usde_token_address",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "unstakeAssetsUSDe",
    inputs: [],
    outputs: [{ name: "success", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updatePrice",
    inputs: [{ name: "amount", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "withdrawCollateral",
    inputs: [
      { name: "_collateral_id", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "success", type: "bool", internalType: "bool" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "withdrawInvestment",
    inputs: [
      { name: "_investment_id", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawLoan",
    inputs: [
      { name: "_loan_id", type: "uint256", internalType: "uint256" },
      { name: "_collateral_id", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "success", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "collateralEvent",
    inputs: [
      {
        name: "active_loan",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
      { name: "existed", type: "bool", indexed: false, internalType: "bool" },
      {
        name: "borrower",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "collateral_id",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "createLoanEvent",
    inputs: [
      {
        name: "_borrower",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "loan_id",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "approved_amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "disburseLoanEvent",
    inputs: [
      {
        name: "loan_disbursed",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
      {
        name: "borrower",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "loan_id",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "due_date",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "investmentEvent",
    inputs: [
      {
        name: "investor",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "total_amount",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "accumulated_interest",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "withdrawal_date",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "investment_id",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "loanRepaymentHistoryEvent",
    inputs: [
      {
        name: "borrower",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "loan_id",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "loan_amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "loan_repayment_history_id",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "loanRequestEvent",
    inputs: [
      {
        name: "loan_disbursed",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
      { name: "repaid", type: "bool", indexed: false, internalType: "bool" },
      {
        name: "borrower",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "collateral_id",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "loan_id",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "duration",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "due_date",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "total_amount_paid",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "withdrawInvestmentEvent",
    inputs: [
      {
        name: "investor",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "total_amount_withdraw",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      { name: "paid", type: "bool", indexed: false, internalType: "bool" },
    ],
    anonymous: false,
  },
  { type: "error", name: "ErrorAccountNotFound", inputs: [] },
  {
    type: "error",
    name: "ErrorAmountShouldBeBetweenMinimumAndMaximumAmount",
    inputs: [{ name: "amount", type: "uint256", internalType: "uint256" }],
  },
  { type: "error", name: "ErrorCollateralDoesntExist", inputs: [] },
  { type: "error", name: "ErrorDurationMustBeLessThanOneYear", inputs: [] },
  { type: "error", name: "ErrorInsufficientFund", inputs: [] },
  {
    type: "error",
    name: "ErrorInvestmentDurationMustMoreThanAMonth",
    inputs: [],
  },
  { type: "error", name: "ErrorInvestmentRepaid", inputs: [] },
  { type: "error", name: "ErrorInvestorNotFound", inputs: [] },
  { type: "error", name: "ErrorLoanDisbursed", inputs: [] },
  { type: "error", name: "ErrorLoanIsYetToBeDisbursed", inputs: [] },
  { type: "error", name: "ErrorLoanNotRepaid", inputs: [] },
  { type: "error", name: "ErrorLoanRepaid", inputs: [] },
  { type: "error", name: "ErrorNotEligibleToWithDraw", inputs: [] },
  { type: "error", name: "ErrorTokenTranferFailed", inputs: [] },
  { type: "error", name: "ErrorUserAlreadyExisted", inputs: [] },
  {
    type: "error",
    name: "ErrorYouHaveExceededMaxLoanCollateralEligibility",
    inputs: [{ name: "loan_amount", type: "uint256", internalType: "uint256" }],
  },
  { type: "error", name: "ErrorZeroAddressProvided", inputs: [] },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
  },
]);
const usdeAbi = narrow([
  {
    inputs: [{ internalType: "address", name: "admin", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "CantRenounceOwnership", type: "error" },
  { inputs: [], name: "InvalidShortString", type: "error" },
  { inputs: [], name: "OnlyMinter", type: "error" },
  {
    inputs: [{ internalType: "string", name: "str", type: "string" }],
    name: "StringTooLong",
    type: "error",
  },
  { inputs: [], name: "ZeroAddressException", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  { anonymous: false, inputs: [], name: "EIP712DomainChanged", type: "event" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newMinter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "oldMinter",
        type: "address",
      },
    ],
    name: "MinterUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { internalType: "bytes1", name: "fields", type: "bytes1" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "version", type: "string" },
      { internalType: "uint256", name: "chainId", type: "uint256" },
      { internalType: "address", name: "verifyingContract", type: "address" },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
      { internalType: "uint256[]", name: "extensions", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minter",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newMinter", type: "address" }],
    name: "setMinter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]);

const usdeOFTAbi = narrow([
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "dstEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "limit",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "window",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct RateLimiter.RateLimitConfig[]",
                "name": "_rateLimitConfigs",
                "type": "tuple[]"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_symbol",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_lzEndpoint",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_delegate",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "target",
                "type": "address"
            }
        ],
        "name": "AddressEmptyCode",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "AddressInsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "CantRenounceOwnership",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "allowance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "approver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "FailedInnerCall",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidDelegate",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidEndpointCall",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidLocalDecimals",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "options",
                "type": "bytes"
            }
        ],
        "name": "InvalidOptions",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "LzTokenUnavailable",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
            }
        ],
        "name": "NoPeer",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "msgValue",
                "type": "uint256"
            }
        ],
        "name": "NotEnoughNative",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "addr",
                "type": "address"
            }
        ],
        "name": "OnlyEndpoint",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
            },
            {
                "internalType": "bytes32",
                "name": "sender",
                "type": "bytes32"
            }
        ],
        "name": "OnlyPeer",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "OnlyRateLimiter",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "OnlySelf",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RateLimitExceeded",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "SafeERC20FailedOperation",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "result",
                "type": "bytes"
            }
        ],
        "name": "SimulationResult",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountLD",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "minAmountLD",
                "type": "uint256"
            }
        ],
        "name": "SlippageExceeded",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "eid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint16",
                        "name": "msgType",
                        "type": "uint16"
                    },
                    {
                        "internalType": "bytes",
                        "name": "options",
                        "type": "bytes"
                    }
                ],
                "indexed": false,
                "internalType": "struct EnforcedOptionParam[]",
                "name": "_enforcedOptions",
                "type": "tuple[]"
            }
        ],
        "name": "EnforcedOptionSet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "inspector",
                "type": "address"
            }
        ],
        "name": "MsgInspectorSet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "guid",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "uint32",
                "name": "srcEid",
                "type": "uint32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "toAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountReceivedLD",
                "type": "uint256"
            }
        ],
        "name": "OFTReceived",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "guid",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "uint32",
                "name": "dstEid",
                "type": "uint32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "fromAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountSentLD",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountReceivedLD",
                "type": "uint256"
            }
        ],
        "name": "OFTSent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferStarted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "peer",
                "type": "bytes32"
            }
        ],
        "name": "PeerSet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "preCrimeAddress",
                "type": "address"
            }
        ],
        "name": "PreCrimeSet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "rateLimiter",
                "type": "address"
            }
        ],
        "name": "RateLimiterSet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "dstEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "limit",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "window",
                        "type": "uint256"
                    }
                ],
                "indexed": false,
                "internalType": "struct RateLimiter.RateLimitConfig[]",
                "name": "rateLimitConfigs",
                "type": "tuple[]"
            }
        ],
        "name": "RateLimitsChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "SEND",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "SEND_AND_CALL",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "acceptOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "srcEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "sender",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint64",
                        "name": "nonce",
                        "type": "uint64"
                    }
                ],
                "internalType": "struct Origin",
                "name": "origin",
                "type": "tuple"
            }
        ],
        "name": "allowInitializePath",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "approvalRequired",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "_eid",
                "type": "uint32"
            },
            {
                "internalType": "uint16",
                "name": "_msgType",
                "type": "uint16"
            },
            {
                "internalType": "bytes",
                "name": "_extraOptions",
                "type": "bytes"
            }
        ],
        "name": "combineOptions",
        "outputs": [
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "composeMsgSender",
        "outputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimalConversionRate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "endpoint",
        "outputs": [
            {
                "internalType": "contract ILayerZeroEndpointV2",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
            },
            {
                "internalType": "uint16",
                "name": "msgType",
                "type": "uint16"
            }
        ],
        "name": "enforcedOptions",
        "outputs": [
            {
                "internalType": "bytes",
                "name": "enforcedOption",
                "type": "bytes"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "_dstEid",
                "type": "uint32"
            }
        ],
        "name": "getAmountCanBeSent",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "currentAmountInFlight",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountCanBeSent",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "_eid",
                "type": "uint32"
            },
            {
                "internalType": "bytes32",
                "name": "_peer",
                "type": "bytes32"
            }
        ],
        "name": "isPeer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "srcEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "sender",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint64",
                        "name": "nonce",
                        "type": "uint64"
                    }
                ],
                "internalType": "struct Origin",
                "name": "_origin",
                "type": "tuple"
            },
            {
                "internalType": "bytes32",
                "name": "_guid",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "_message",
                "type": "bytes"
            },
            {
                "internalType": "address",
                "name": "_executor",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "_extraData",
                "type": "bytes"
            }
        ],
        "name": "lzReceive",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "components": [
                            {
                                "internalType": "uint32",
                                "name": "srcEid",
                                "type": "uint32"
                            },
                            {
                                "internalType": "bytes32",
                                "name": "sender",
                                "type": "bytes32"
                            },
                            {
                                "internalType": "uint64",
                                "name": "nonce",
                                "type": "uint64"
                            }
                        ],
                        "internalType": "struct Origin",
                        "name": "origin",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint32",
                        "name": "dstEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "address",
                        "name": "receiver",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "guid",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "executor",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "message",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes",
                        "name": "extraData",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct InboundPacket[]",
                "name": "_packets",
                "type": "tuple[]"
            }
        ],
        "name": "lzReceiveAndRevert",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "srcEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "sender",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint64",
                        "name": "nonce",
                        "type": "uint64"
                    }
                ],
                "internalType": "struct Origin",
                "name": "_origin",
                "type": "tuple"
            },
            {
                "internalType": "bytes32",
                "name": "_guid",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "_message",
                "type": "bytes"
            },
            {
                "internalType": "address",
                "name": "_executor",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "_extraData",
                "type": "bytes"
            }
        ],
        "name": "lzReceiveSimulate",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "msgInspector",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            },
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "nextNonce",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "nonce",
                "type": "uint64"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oApp",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oAppVersion",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "senderVersion",
                "type": "uint64"
            },
            {
                "internalType": "uint64",
                "name": "receiverVersion",
                "type": "uint64"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "oftVersion",
        "outputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            },
            {
                "internalType": "uint64",
                "name": "version",
                "type": "uint64"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "eid",
                "type": "uint32"
            }
        ],
        "name": "peers",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "peer",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pendingOwner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "preCrime",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "dstEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "to",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountLD",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minAmountLD",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "extraOptions",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes",
                        "name": "composeMsg",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes",
                        "name": "oftCmd",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct SendParam",
                "name": "_sendParam",
                "type": "tuple"
            }
        ],
        "name": "quoteOFT",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "minAmountLD",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "maxAmountLD",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct OFTLimit",
                "name": "oftLimit",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "int256",
                        "name": "feeAmountLD",
                        "type": "int256"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    }
                ],
                "internalType": "struct OFTFeeDetail[]",
                "name": "oftFeeDetails",
                "type": "tuple[]"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "amountSentLD",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountReceivedLD",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct OFTReceipt",
                "name": "oftReceipt",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "dstEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "to",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountLD",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minAmountLD",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "extraOptions",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes",
                        "name": "composeMsg",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes",
                        "name": "oftCmd",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct SendParam",
                "name": "_sendParam",
                "type": "tuple"
            },
            {
                "internalType": "bool",
                "name": "_payInLzToken",
                "type": "bool"
            }
        ],
        "name": "quoteSend",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "nativeFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lzTokenFee",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct MessagingFee",
                "name": "msgFee",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rateLimiter",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "dstEid",
                "type": "uint32"
            }
        ],
        "name": "rateLimits",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountInFlight",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "lastUpdated",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "limit",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "window",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "dstEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "to",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountLD",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minAmountLD",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "extraOptions",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes",
                        "name": "composeMsg",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes",
                        "name": "oftCmd",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct SendParam",
                "name": "_sendParam",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "nativeFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lzTokenFee",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct MessagingFee",
                "name": "_fee",
                "type": "tuple"
            },
            {
                "internalType": "address",
                "name": "_refundAddress",
                "type": "address"
            }
        ],
        "name": "send",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "guid",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint64",
                        "name": "nonce",
                        "type": "uint64"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "nativeFee",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "lzTokenFee",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct MessagingFee",
                        "name": "fee",
                        "type": "tuple"
                    }
                ],
                "internalType": "struct MessagingReceipt",
                "name": "msgReceipt",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "amountSentLD",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountReceivedLD",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct OFTReceipt",
                "name": "oftReceipt",
                "type": "tuple"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_delegate",
                "type": "address"
            }
        ],
        "name": "setDelegate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "eid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint16",
                        "name": "msgType",
                        "type": "uint16"
                    },
                    {
                        "internalType": "bytes",
                        "name": "options",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct EnforcedOptionParam[]",
                "name": "_enforcedOptions",
                "type": "tuple[]"
            }
        ],
        "name": "setEnforcedOptions",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_msgInspector",
                "type": "address"
            }
        ],
        "name": "setMsgInspector",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "_eid",
                "type": "uint32"
            },
            {
                "internalType": "bytes32",
                "name": "_peer",
                "type": "bytes32"
            }
        ],
        "name": "setPeer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_preCrime",
                "type": "address"
            }
        ],
        "name": "setPreCrime",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_rateLimiter",
                "type": "address"
            }
        ],
        "name": "setRateLimiter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "dstEid",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "limit",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "window",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct RateLimiter.RateLimitConfig[]",
                "name": "_rateLimitConfigs",
                "type": "tuple[]"
            }
        ],
        "name": "setRateLimits",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "sharedDecimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "token",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
])
export { ethenacreditAbi, ethenacreditAddress, usdeAbi, USDe, sUSDe };
