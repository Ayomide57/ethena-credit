
import { ChangeEvent } from "react";
import { useStorageUpload } from "thirdweb/react";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

import { readContract, writeContract } from "@wagmi/core";

import {
  chaincreditAbi,
  chaincreditAddress,
  registrarAbi,
  registrarAddresses,
} from "./constants";
import { config, neo } from "./config";

interface IUploadFile {
  updateLink: (value: string) => void;
}

export const UploadToStorage = ({ updateLink }: IUploadFile) => {
  const { mutateAsync: upload } = useStorageUpload();

  const uploadFile = async (event: ChangeEvent<HTMLInputElement | null>) => {
    let file = event.currentTarget.files && event.currentTarget.files[0];
    const uris = await upload({ data: [file] });
    updateLink(uris[0]);
  };
  return (
    <label htmlFor="myfile">
      <div className={styles.logo}>
        <Image
          src="/upload.png"
          alt="upload Logo"
          height="100"
          width="250"
        />
      </div>
      <input
        className="h-[80px]"
        id="myfile"
        type="file"
        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
        style={{ display: "none" }}
        onChange={(event) => uploadFile(event)}
        />
    </label>
  );

};


export const registerCompany = async (values: {
  username: string;
  companyname: string;
  phonenumber: string;
  address: string;
}) => {
  const response = await writeContract(config, {
    address: chaincreditAddress,
    abi: chaincreditAbi,
    functionName: "register",
    args: [
      values.username,
      values.companyname,
      values.address,
      values.phonenumber,
    ],
    chainId: neo.id,
    chain: neo
  });
  return response;
};

export const addCompanyCollateral = async (values: {
  acres: number;
  documenturl: string;
  price: number;
  property_RegId: number;
  survey_zip_code: number;
  survey_number: number;
  property_type: string;
  property_area: string;
  prop_accessment_per_acre: number;
}) => {
  const response = await writeContract(config, {
    address: chaincreditAddress,
    abi: chaincreditAbi,
    functionName: "addColaterals",
    args: [
      values.acres,
      values.documenturl,
      BigInt(values.price),
      BigInt(values.property_RegId),
      BigInt(values.survey_zip_code),
      BigInt(values.survey_number),
      values.property_type,
      values.property_area,
      BigInt(values.prop_accessment_per_acre),
    ],
  });
  return response;
};

export const loanRequest = async (values: {
  amount: number;
  property_RegId: number;
}) => {
  const response = await writeContract(config, {
    address: chaincreditAddress,
    abi: chaincreditAbi,
    functionName: "loanRequest",
    args: [BigInt(values.property_RegId), BigInt(values.amount)],
  });

  return response;
};

export const loanList = async (values: {
  address: `0x${string}`;
  loanId: number;
}) => {
  const response = await readContract(config, {
    address: chaincreditAddress,
    abi: chaincreditAbi,
    functionName: "loanList",
    args: [values.address, BigInt(values.loanId)],
  });

  return response;
  
};

export const getLoanRequestList = async (values: {
  address: `0x${string}`;
  requestId: number;
}) => {
  const response = await readContract(config, {
    address: chaincreditAddress,
    abi: chaincreditAbi,
    functionName: "requestList",
    args: [values.address, BigInt(values.requestId)],
  });

  return response;
};


export const collateralList = async (values: {
  address: `0x${string}`;
  property_RegId: number;
}) => {
  const response = await readContract(config, {
    address: chaincreditAddress,
    abi: chaincreditAbi,
    functionName: "getCollateral",
    args: [values.address, BigInt(values.property_RegId)],
  });
  return response;
};

// Registrar


export const verificationRequest = async (values: {
  p_owner: `0x${string}`;
  property_RegId: number;
  survey_zip_code: number;
  survey_number: number;
}) => {
  const response = await writeContract(config, {
    address: registrarAddresses,
    abi: registrarAbi,
    functionName: "verification_request",
    args: [
      values.p_owner,
      BigInt(values.property_RegId),
      BigInt(values.survey_zip_code),
      BigInt(values.survey_number),
    ],
  });
  return response;
};

export const transferAsset = async (values: {
  tokenId: number;
  newOwner: `0x${string}`;
  property_RegId: number;
}) => {
  const response = await writeContract(config, {
    address: registrarAddresses,
    abi: registrarAbi,
    functionName: "transferAsset",
    args: [
      BigInt(values.tokenId),
      values.newOwner,
      BigInt(values.property_RegId),
    ],
  });
  return response;
};

export const assets = async (values: { address: `0x${string}`; assetId: number }) => {
  const response = await readContract({
    address: registrarAddresses,
    abi: registrarAbi,
    functionName: "assets",
    args: [values.address, BigInt(values.assetId)],
  });
  return response;
};

//Lender 

export const loanRequestLender = async (values: {
  amount: number;
  property_RegId: number;
}) => {
  const response = await writeContract(config, {
    address: chaincreditAddress,
    abi: chaincreditAbi,
    functionName: "loanRequest",
    args: [BigInt(values.amount), BigInt(values.property_RegId)],
  });
  return response;
};

export const createLoanLender = async (values: {
  borrower: `0x${string}`;
  loan_amount_term: number;
  credit_history: number;
  approved_amount: number;
  applicant_biz_income: number;
  property_RegId: number;
  biz_id: string;
  payment_type: number;
}) => {
  const response = await writeContract(config, {
    address: chaincreditAddress,
    abi: chaincreditAbi,
    functionName: "create_loan",
    args: [
      values.borrower,
      values.loan_amount_term,
      values.credit_history,
      BigInt(values.approved_amount),
      BigInt(values.applicant_biz_income),
      BigInt(values.property_RegId),
      values.biz_id,
      values.payment_type,
    ],
  });
  return response;
};


export const getCompany = async (values: {
  borrower: `0x${string}`;
}) => {
  const response = await readContract(config, {
    address: chaincreditAddress,
    abi: chaincreditAbi,
    functionName: "getCompany",
    args: [values.borrower],
  });
  return response;
};







