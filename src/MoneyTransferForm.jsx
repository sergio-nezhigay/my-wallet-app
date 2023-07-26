import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getAccountBalance } from "./getAccountBalance";

const validationSchema = (balance, web3) =>
  Yup.object().shape({
    sum: Yup.number()
      .required("Sum is required")
      .test("balanceCheck", "Insufficient balance", function (value) {
        return value <= balance;
      })
      .test("amountRangeCheck", "Invalid amount range", function (value) {
        const minAmount = 0.000001;
        const maxAmount = 100000;
        const isMultipleOf10 = value % 10 === 0;
        return value >= minAmount && value <= maxAmount && isMultipleOf10;
      }),
    recipient: Yup.string()
      .required("Recipient is required")
      .matches(/^0x[0-9A-Fa-f]{40}$/, "Invalid Ethereum wallet address")
      .test(
        "validAddress",
        "Invalid Ethereum wallet address checksum",
        function (value) {
          // correct address for checking "0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d"
          return (
            web3.utils.isAddress(value) &&
            web3.utils.checkAddressChecksum(value)
          );
        }
      ),
  });

const MoneyTransferForm = ({ web3, accounts, setBalance, balance }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Form submitted:", values);
    const { recipient, sum } = values;
    try {
      await web3.eth.sendTransaction({
        from: accounts[0],
        to: recipient,
        value: web3.utils.toWei(sum.toString(), "ether"),
      });
      setSuccessMessage("Money transfer successful!");
      setErrorMessage("");

      const updatedBalance = await getAccountBalance(web3, accounts[0]);
      setBalance(updatedBalance);
      setErrorMessage("");
      setSubmitting(false);
    } catch (error) {
      console.error("Transfer error: ", error);
      setSuccessMessage("");
      setErrorMessage("Error occurred during money transfer.");
      setSubmitting(false);
    }
  };

  const initialValues = {
    sum: "",
    recipient: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema(balance, web3)}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty, isSubmitting }) => (
        <Form>
          <h2>Token Transfer Form</h2>
          <div>
            <label htmlFor="recipient">Recipient Address:</label>
            <Field type="text" name="recipient" id="recipient" />
            <ErrorMessage name="recipient" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="sum">Token Amount:</label>
            <Field type="number" name="sum" id="sum" />
            <ErrorMessage name="sum" component="div" className="error" />
          </div>
          <button type="submit" disabled={!isValid || !dirty || isSubmitting}>
            Perform Transfer
          </button>
          {successMessage && <div>{successMessage}</div>}
          {errorMessage && <div>{errorMessage}</div>}
          {isSubmitting && <div>Submitting...</div>}
        </Form>
      )}
    </Formik>
  );
};

export default MoneyTransferForm;
