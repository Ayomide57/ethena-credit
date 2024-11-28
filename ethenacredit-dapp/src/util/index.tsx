/* eslint-disable @typescript-eslint/no-explicit-any */



import { ethenacreditAbi, ethenacreditAddress, USDe, usdeAbi } from "./constants";

import { ethers, JsonRpcProvider } from "ethers";
import { prepareContractCall, getContract, sendTransaction, createThirdwebClient } from "thirdweb";
import {
  approve,
} from "thirdweb/extensions/erc20";

//import { BigNumberish } from "ethers";
import toast from "react-hot-toast";
import { sepolia } from "thirdweb/chains";



const clientId = process.env.NEXT_PUBLIC_ClIENT_ID2 || "";

export const client = createThirdwebClient({
  clientId: clientId,
});


export const ethenaCreditContract = getContract({
  client,
  address: ethenacreditAddress,
  chain: sepolia,
  abi: ethenacreditAbi,
});

export const usdeContract = getContract({
  client,
  address: USDe,
  chain: sepolia,
  abi: usdeAbi,
});



export const addCollateral = async (values: { account: any, amount: number }) => {
  try {
    const transaction = prepareContractCall({
      contract: ethenaCreditContract,
      method: "addCollateral",
      params: [BigInt(values.amount)],
    });

    const { transactionHash } = await sendTransaction({
      account: values.account,
      transaction,
    });

    toast.success(transactionHash);
    return transactionHash;
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return error;
  }
};

export const loanRequest = async (values: {
  account: never;
  collateral_id: number;
  amount: number;
  duration: number;
}) => {
  try {
    const transaction = prepareContractCall({
      contract: ethenaCreditContract,
      method: "loanRequest",
      params: [
        BigInt(values.collateral_id),
        BigInt(values.amount),
        BigInt(values.duration),
      ],
    });

    const { transactionHash } = await sendTransaction({
      account: values.account,
      transaction,
    });

    toast.success(transactionHash);
    return transactionHash;
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return error;
  }
};

export const withdrawLoan = async (values: {
  account: never;
  loan_id: number;
  collateral_id: number;
}) => {
  try {
    const transaction = prepareContractCall({
      contract: ethenaCreditContract,
      method: "withdrawLoan",
      params: [BigInt(values.loan_id), BigInt(values.collateral_id)],
    });

    const { transactionHash } = await sendTransaction({
      account: values.account,
      transaction,
    });

    toast.success(transactionHash);
    return transactionHash;
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return error;
  }
};

export const withdrawCollateral = async (values: {
  account: never;
  collateral_id: number;
}) => {
  try {
    const transaction = prepareContractCall({
      contract: ethenaCreditContract,
      method: "withdrawCollateral",
      params: [
        BigInt(values.collateral_id)],
    });

    const { transactionHash } = await sendTransaction({
      account: values.account,
      transaction,
    });

    toast.success(transactionHash);
    return transactionHash;
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return error;
  }
};

export const withdrawInvestment = async (values: {
  account: never;
  investment_id: number;
}) => {
  try {
    const transaction = prepareContractCall({
      contract: ethenaCreditContract,
      method: "withdrawInvestment",
      params: [BigInt(values.investment_id)],
    });

    const { transactionHash } = await sendTransaction({
      account: values.account,
      transaction,
    });

    toast.success(transactionHash);
    return transactionHash;
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return error;
  }
};

export const cooldownAssetsUSDe = async (values: {
  account: never;
  amount: number;
}) => {
  try {
    const transaction = prepareContractCall({
      contract: ethenaCreditContract,
      method: "cooldownAssetsUSDe",
      params: [BigInt(values.amount)],
    });

    const { transactionHash } = await sendTransaction({
      account: values.account,
      transaction,
    });

    toast.success(transactionHash);
    return transactionHash;
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return error;
  }
};

export const unstakeAssetsUSDe = async (values: {
  account: never;
  amount: number;
}) => {
  try {
    const transaction = prepareContractCall({
      contract: ethenaCreditContract,
      method: "unstakeAssetsUSDe",
      params: [BigInt(values.amount)],
    });

    const { transactionHash } = await sendTransaction({
      account: values.account,
      transaction,
    });

    toast.success(transactionHash);
    return transactionHash;
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return error;
  }
};

export const payLoan = async (
  account: any,
  amount: number,
  loan_id: number,
  collateral_id: number
) => {
  try {
    //get usde abi and create contrat
    const tx = approve({
      contract: usdeContract,
      spender: ethenacreditAddress,
      amount: Number(amount),
    });

    const { transactionHash } = await sendTransaction({
      account: account,
      transaction: tx,
    });

    if (transactionHash) {
      setTimeout(async () => {
        const transaction = prepareContractCall({
          contract: ethenaCreditContract,
          method: "payLoan",
          params: [BigInt(loan_id), BigInt(collateral_id), BigInt(amount)],
        });
        const { transactionHash } = await sendTransaction({
          account: account,
          transaction,
        });
        toast.success(transactionHash);
      }, 7000);
    }
    return transactionHash;
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return error;
  }
};

export const invest = async (
  account: any,
  amount: number,
  duration: number
) => {
  try {
    //get usde abi and create contrat
    const tx = approve({
      contract: usdeContract,
      spender: ethenacreditAddress,
      amount: Number(amount),
    });

    const { transactionHash } = await sendTransaction({
      account: account,
      transaction: tx,
    });

    if (transactionHash) {
      setTimeout(async () => {
        const transaction = prepareContractCall({
          contract: ethenaCreditContract,
          method: "invest",
          params: [BigInt(amount), BigInt(duration)],
        });
        const { transactionHash } = await sendTransaction({
          account: account,
          transaction,
        });
        toast.success(transactionHash);
      }, 7000);
    }
    return transactionHash;
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return error;
  }
};

export const loanList = async (values: {
  account: any;
  address: `0x${string}`;
  loanId: number;
}) => {
  try {
    const transaction = prepareContractCall({
      contract: ethenaCreditContract,
      method: "loanList",
      params: [values.account.address, BigInt(values.loanId)],
    });

    const { transactionHash } = await sendTransaction({
      account: values.account,
      transaction,
    });

    return transactionHash;
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return error;
  }
};

export const investorList = async (values: {
  account: any;
  address: `0x${string}`;
  investment_id: number;
}) => {
  try {
    const transaction = prepareContractCall({
      contract: ethenaCreditContract,
      method: "investorList",
      params: [values.account.address, BigInt(values.investment_id)],
    });

    const { transactionHash } = await sendTransaction({
      account: values.account,
      transaction,
    });

    return transactionHash;
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return error;
  }
};

export const collateralList = async (values: {
  account: any;
  address: `0x${string}`;
  collateral_id: number;
}) => {
  try {
    const transaction = prepareContractCall({
      contract: ethenaCreditContract,
      method: "collateralList",
      params: [values.account.address, BigInt(values.collateral_id)],
    });

    const { transactionHash } = await sendTransaction({
      account: values.account,
      transaction,
    });

    return transactionHash;
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return error;
  }
};

const url = "https://11155111.rpc.thirdweb.com/";
export const providerLink = new JsonRpcProvider(url);

export const ethenaContract = new ethers.Contract(
  ethenacreditAddress,
  ethenacreditAbi,
  providerLink
);












