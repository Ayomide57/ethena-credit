"use client";

import styles from "@/styles/Home.module.css";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/Button";
import { Formik } from "formik";
import { createLoanLender } from "@/util";
import { toast } from "react-hot-toast";


const CreateNewLoan = () => {
  const handleCreateNewLoanSubmit = (
    values: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      borrower: any;
      loan_amount_term: number;
      credit_history: number;
      approved_amount: number;
      applicant_biz_income: number;
      property_RegId: number;
      biz_id: string;
      payment_type: number;
    },
    setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void }
  ) => {
    setTimeout(async () => {
      console.log(values);
      const response = await createLoanLender(values);
      if (response) toast.success(response);
      console.log(response);
      setSubmitting(false);
    }, 400);
  };

  return (
    <>
      <div className="container ">
        <h1 className="p-4 text-3xl">Create a New Loan</h1>
        <div className={styles.content}>
          <div className="container mx-auto">
            <div className="p-20">
              <Formik
                initialValues={{
                  borrower: "",
                  loan_amount_term: 0,
                  credit_history: 0,
                  approved_amount: 0,
                  applicant_biz_income: 0,
                  property_RegId: 0,
                  biz_id: "",
                  payment_type: 3,
                }}
                onSubmit={(values, { setSubmitting }) =>
                  handleCreateNewLoanSubmit(values, setSubmitting)
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
                      value={values.borrower}
                      placeholder="Borrower Address"
                      name="borrower"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.borrower && touched.borrower && errors.borrower}
                    <CustomInput
                      value={`${values.property_RegId}`}
                      placeholder="Property Registration Number"
                      name="property_RegId"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.property_RegId &&
                      touched.property_RegId &&
                      errors.property_RegId}
                    <CustomInput
                      value={`${values.loan_amount_term}`}
                      placeholder="Loan Amount Term"
                      name="loan_amount_term"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.loan_amount_term &&
                      touched.loan_amount_term &&
                      errors.loan_amount_term}
                    <CustomInput
                      value={`${values.credit_history}`}
                      placeholder="Credit History"
                      name="credit_history"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.credit_history &&
                      touched.credit_history &&
                      errors.credit_history}{" "}
                    <CustomInput
                      value={`${values.approved_amount}`}
                      placeholder="Approved Amount"
                      name="approved_amount"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.approved_amount &&
                      touched.approved_amount &&
                      errors.approved_amount}
                    <CustomInput
                      value={`${values.applicant_biz_income}`}
                      placeholder="Applicant Business Income"
                      name="applicant_biz_income"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.applicant_biz_income &&
                      touched.applicant_biz_income &&
                      errors.applicant_biz_income}
                    <CustomInput
                      value={values.biz_id}
                      placeholder="Business ID"
                      name="biz_id"
                      style={{ color: "black" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.biz_id && touched.biz_id && errors.biz_id}
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

export default CreateNewLoan;
