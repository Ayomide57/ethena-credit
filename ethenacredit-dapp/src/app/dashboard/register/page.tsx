"use client";
import styles from "@/styles/Home.module.css";
import CustomInput from "@/components/CustomInput";
import { useCallback, useEffect, useState } from "react";
import CustomButton from "@/components/Button";
import { Formik } from "formik";
import { registerCompany } from "@/util";
import { getAccount } from "@wagmi/core";
import { config } from "@/util/config";
import { toast } from "react-hot-toast";

const Register = () => {
  const handleRegisterSubmit = async (
    values: {
      username: string;
      companyname: string;
      phonenumber: string;
      address: string;
    },
    setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void }
  ) => {
    setTimeout(async () => {
      const response = await registerCompany(values);
      console.log(values);
      console.log(response);
      if (response.search("0x")) {
        toast.success(response);
      } else {
        toast.error(response);
      }
      setSubmitting(false);
    }, 400);
  };

  const [account, setAccount] = useState<`0x${string}`>();
  const UpdateUI =useCallback(async () => {
    const accountSource = await getAccount(config);
    setAccount(accountSource?.address);
    console.log(account);
  },[account]);

  useEffect(() => {
    UpdateUI();
  }, [UpdateUI, account]);

  return (
    <>
      <div className={styles.container}>
        <h1 className="p-4 text-3xl">Company Information</h1>
        <div className={styles.content}>
          <div className="container mx-auto">
            <div className="p-4">
              <h1 className="">Register your company information</h1>
              <Formik
                initialValues={{
                  username: "",
                  companyname: "",
                  phonenumber: "",
                  address: "",
                }}
                onSubmit={(values, { setSubmitting }) =>
                  handleRegisterSubmit(values, setSubmitting)
                }
              >
                {({
                  values,
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
                      value={values.username}
                      placeholder="Name"
                      name="username"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.username && touched.username && errors.username}
                    <CustomInput
                      value={values.companyname}
                      placeholder="Company Name"
                      name="companyname"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.companyname &&
                      touched.companyname &&
                      errors.companyname}
                    <CustomInput
                      value={values.phonenumber}
                      placeholder="Phone number"
                      name="phonenumber"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.phonenumber &&
                      touched.phonenumber &&
                      errors.phonenumber}{" "}
                    <CustomInput
                      value={values.address}
                      placeholder="Company Physical Address"
                      name="address"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.address && touched.address && errors.address}
                    <CustomButton
                      value="Submit"
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

export default Register;
