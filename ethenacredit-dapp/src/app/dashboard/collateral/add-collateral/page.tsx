/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import styles from "@/styles/Home.module.css";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/Button";
import { Formik } from "formik";
import { addCollateral } from "@/util";
//import { toast } from "react-hot-toast";
import { useActiveAccount } from "thirdweb/react";

const AddCollateral = () => {
  const smartAccount = useActiveAccount();

  const handleAddCollateralSubmit = (
    values: {
      amount: number;
      account: any;
    },
    setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void }
  ) => {
    setTimeout(async () => {
      values.account = smartAccount ? smartAccount : undefined;
      const response: unknown = await addCollateral(values);
      console.log(response);
      //if (response) toast.success(response);
      setSubmitting(false);
    }, 400);
  };

  return (
    <>
      <div
        className="container ml-20"
        style={{ width: "-webkit-fill-available" }}
      >
        <h1 className="p-4 text-3xl">Collateral</h1>
        <div className={styles.content}>
          <div className="container mx-auto">
            <div className="p-4">
              <h1 className="">Add your collateral</h1>
              <Formik
                initialValues={{
                  amount: 0,
                  account: smartAccount ? smartAccount : undefined,
                }}
                onSubmit={(values, { setSubmitting }) =>
                  handleAddCollateralSubmit(values, setSubmitting)
                }
              >
                {({
                  //values,
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
                      value="Submit"
                      type={"button"}
                      style={{ float: "inline-end" }}
                      disabled={isSubmitting}
                      onClick={handleSubmit}
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

export default AddCollateral;
