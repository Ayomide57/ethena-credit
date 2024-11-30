/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import styles from "@/styles/Home.module.css";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/Button";
import { Formik } from "formik";
import { loanRequest } from "@/util";
import { toast } from "react-hot-toast";
import { Select } from "@/components/ui/select";
import { useActiveAccount } from "thirdweb/react";


const lists = [
    { id: 1, month: "1 month" },
    { id: 2, month: "2 months" },
    { id: 3, month: "3 months" },
    { id: 4, month: "4 months" },
    { id: 5, month: "5 months" },
    { id: 6, month: "6 months" },
    { id: 7, month: "7 months" },
    { id: 8, month: "8 months" },
    { id: 9, month: "9 months" },
    { id: 10, month: "10 months" },
    { id: 11, month: "11 months" },
    { id: 12, month: "12 months" },
];


const LoanRequest = ({
  params,
}: {
  params: { id: string; };
}) => {
  const smartAccount = useActiveAccount();

  const handleLoanRequest = (
    values: {
      account: any;
      collateral_id: number;
      amount: number;
      duration: any;
    },
    setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void }
  ) => {
    setTimeout(async () => {
      //values.duration = moment().add(values.duration, "months").unix();
      values.duration = values.duration * 30;
      values.account = smartAccount ? smartAccount : undefined;
      const response: any = await loanRequest(values);
      if (response) toast.success(response);
      setSubmitting(false);
    }, 400);
  };

  return (
    <>
      <div className="container ml-16 mr-5">
        <h1 className="p-4 text-3xl">Request for loan</h1>
        <div className={styles.content}>
          <div className="container mx-auto">
            <div className="p-4">
              <Formik
                initialValues={{
                  account: smartAccount ? smartAccount : undefined,
                  collateral_id: Number(params.id),
                  amount: 0,
                  duration: 0,
                }}
                onSubmit={(values, { setSubmitting }) =>
                  handleLoanRequest(values, setSubmitting)
                }
              >
                {({
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit}>
                    <CustomInput
                      placeholder="Amount"
                      name="amount"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.amount && touched.amount && errors.amount}
                    <Select
                      name="duration"
                      onChange={handleChange}
                      lists={lists}
                    />
                    {errors.duration && touched.duration && errors.duration}
                    <CustomButton
                      value="Request"
                      type={"button"}
                      style={{ float: "inline-end" }}
                      disabled={isSubmitting}
                      onClick={() => handleSubmit()}
                    />
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanRequest;
