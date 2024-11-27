"use client";
import styles from "@/styles/Home.module.css";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/Button";
import { Formik } from "formik";
import { payLoan } from "@/util";
//import { toast } from "react-hot-toast";
import { useActiveAccount } from "thirdweb/react";

const PayLoan = ({
  params,
}: {
  params: { id: string; collateral_id: string };
}) => {
  const smartAccount = useActiveAccount();

  const handlePayLoan = (
    values: {
      amount: number;
    },
    setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void }
  ) => {
    setTimeout(async () => {
      const response = await payLoan(
        smartAccount,
        values.amount,
        Number(params.id),
        Number(params.collateral_id)
      );
      console.log(response);
      //if (response) toast.success(response);
      setSubmitting(false);
    }, 400);
  };

  return (
    <>
      <div className="container ml-16 mr-5">
        <h1 className="p-4 text-3xl">Pay loan</h1>
        <div className={styles.content}>
          <div className="container mx-auto">
            <div className="p-4">
              <Formik
                initialValues={{
                  amount: 0,
                }}
                onSubmit={(values, { setSubmitting }) =>
                  handlePayLoan(values, setSubmitting)
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
                    <CustomButton
                      value="Pay Loan"
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

export default PayLoan;
