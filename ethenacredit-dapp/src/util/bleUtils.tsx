/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ethenacreditBleAbi,
  ethenacreditBleAddress,
  USDeOft,
  sUSDeOft,
  usdeOFTAbi,
} from "./constants";

import { ethers, JsonRpcProvider } from "ethers";
import {
  prepareContractCall,
  getContract,
  sendTransaction,
  createThirdwebClient,
  waitForReceipt,
} from "thirdweb";
import { approve } from "thirdweb/extensions/erc20";

//import { BigNumberish } from "ethers";
import toast from "react-hot-toast";
import { sepolia } from "thirdweb/chains";
import { EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js";

const clientId = process.env.NEXT_PUBLIC_ClIENT_ID2 || "";
const priceIds = [process.env["NEXT_PUBLIC_PRICEFEEDIDS"] as string];

export const pythConnection = new EvmPriceServiceConnection(
  "https://hermes.pyth.network"
);

export const client = createThirdwebClient({
  clientId: clientId,
});

export const ethenaCreditContract = getContract({
  client,
  address: ethenacreditBleAddress,
  chain: sepolia,
  abi: ethenacreditBleAbi,
});

export const usdeContract = getContract({
  client,
  address: USDeOft,
  chain: sepolia,
  abi: usdeOFTAbi,
});

export const addCollateral = async (values: {
  account: any;
  amount: number;
}) => {
  try {
    const tx = approve({
      contract: usdeContract,
      spender: ethenacreditBleAddress,
      amount: Number(values.amount),
    });

    const { transactionHash } = await sendTransaction({
      account: values.account,
      transaction: tx,
    });
    const receipt = await waitForReceipt({
      client,
      chain: sepolia,
      transactionHash: transactionHash,
    });
    if (receipt) {
      setTimeout(async () => {
        const transaction = prepareContractCall({
          contract: ethenaCreditContract,
          method: "addCollateral",
          params: [BigInt(values.amount * 1000000000000000000)],
        });

        const { transactionHash } = await sendTransaction({
          account: values.account,
          transaction,
        });
        toast.success(transactionHash);
      }, 5000);
    }

    toast.success(transactionHash);
    return transactionHash;
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return false;
  }
};

export const loanRequest = async (values: {
  account: any;
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
        BigInt(values.amount * 1000000000000000000),
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
    return false;
  }
};

export const withdrawLoan = async (
  account: any,
  amount: number,
  loan_id: number,
  collateral_id: number
) => {
  try {
    const priceFeedUpdateData: any =
      await pythConnection.getPriceFeedsUpdateData(priceIds);
    const tx = approve({
      contract: usdeContract,
      spender: ethenacreditBleAddress,
      amount: amount,
    });

    const { transactionHash } = await sendTransaction({
      account: account,
      transaction: tx,
    });
    if (transactionHash) {
      setTimeout(async () => {
        const tx = approve({
          contract: usdeContract,
          spender: sUSDeOft,
          amount: amount,
        });

        const { transactionHash } = await sendTransaction({
          account: account,
          transaction: tx,
        });
        const receipt = await waitForReceipt({
          client,
          chain: sepolia,
          transactionHash: transactionHash,
        });

        if (receipt) {
          const transaction = prepareContractCall({
            contract: ethenaCreditContract,
            method: "withdrawLoan",
            params: [
              BigInt(loan_id),
              BigInt(collateral_id),
              priceFeedUpdateData,
            ],
          });

          const { transactionHash } = await sendTransaction({
            account: account,
            transaction,
          });
          toast.success(transactionHash);
        }
      }, 5000);
    }
    toast.success(transactionHash);
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return false;
  }
};

export const withdrawCollateral = async (
  account: any,
  collateral_id: number
) => {
  try {
    const transaction = prepareContractCall({
      contract: ethenaCreditContract,
      method: "withdrawCollateral",
      params: [BigInt(collateral_id)],
    });

    const { transactionHash } = await sendTransaction({
      account: account,
      transaction,
    });

    toast.success(transactionHash);
    return transactionHash;
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return false;
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
    return false;
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
      spender: ethenacreditBleAddress,
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
    return false;
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
      spender: ethenacreditBleAddress,
      amount: Number(amount),
    });

    const { transactionHash } = await sendTransaction({
      account: account,
      transaction: tx,
    });

    const receipt = await waitForReceipt({
      client,
      chain: sepolia,
      transactionHash: transactionHash,
    });

    if (receipt) {
      setTimeout(async () => {
        const transaction = prepareContractCall({
          contract: ethenaCreditContract,
          method: "invest",
          params: [BigInt(amount * 1000000000000000000), BigInt(duration)],
        });
        const { transactionHash } = await sendTransaction({
          account: account,
          transaction,
        });
        toast.success(transactionHash);
      }, 12000);
    }
    return transactionHash;
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return false;
  }
};

export const updatePrice = async (account: any, amount: number) => {
  try {
    const priceFeedUpdateData: any =
      await pythConnection.getPriceFeedsUpdateData(priceIds);

    const transaction = prepareContractCall({
      contract: ethenaCreditContract,
      method: "updatePrice",
      params: [priceFeedUpdateData, BigInt(amount * 1000000000000000000)],
    });

    const { transactionHash } = await sendTransaction({
      account: account,
      transaction,
    });

    toast.success(transactionHash);
    return transactionHash;
  } catch (error) {
    toast.error("Transaction Failed");
    console.log("error =======================", error);
    return false;
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
    return false;
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
    return false;
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
    return false;
  }
};

const url = "https://52085143.rpc.thirdweb.com/";
export const providerLink = new JsonRpcProvider(url);

export const ethenaContract = new ethers.Contract(
  ethenacreditBleAddress,
  ethenacreditBleAbi,
  providerLink
);
