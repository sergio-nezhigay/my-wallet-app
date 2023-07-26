import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getAccountBalance } from "../utils/getAccountBalance";
import {
  FormContainer,
  Label,
  Input,
  SubmitButton,
  ErrorText,
} from "../styles/MoneyTransferForm.styled";
import validationSchema from "../utils/validationSchemas";

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
    <FormContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(balance, web3)}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Form>
            <h2>Token Transfer Form</h2>
            <div>
              <Label htmlFor="recipient">Recipient Address:</Label>
              <Field as={Input} type="text" name="recipient" id="recipient" />
              <ErrorMessage name="recipient" component={ErrorText} />
            </div>
            <div>
              <Label htmlFor="sum">Token Amount:</Label>
              <Field as={Input} type="number" name="sum" id="sum" />
              <ErrorMessage name="sum" component={ErrorText} />
            </div>
            <SubmitButton
              type="submit"
              disabled={!isValid || !dirty || isSubmitting}
            >
              Perform Transfer
            </SubmitButton>
            {successMessage && <div>{successMessage}</div>}
            {errorMessage && <div>{errorMessage}</div>}
            {isSubmitting && <div>Submitting...</div>}
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default MoneyTransferForm;

MoneyTransferForm.propTypes = {
  web3: PropTypes.object.isRequired,
  accounts: PropTypes.array.isRequired,
  setBalance: PropTypes.func.isRequired,
  balance: PropTypes.number.isRequired,
};
