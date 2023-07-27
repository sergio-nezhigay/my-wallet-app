import { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ThreeCircles } from "react-loader-spinner";

import { getAccountBalance } from "../../utils/getAccountBalance";
import {
  FormContainer,
  Label,
  Input,
  SubmitButton,
  ErrorText,
  SuccessMessageStyled,
} from "./MoneyTransferForm.styled";
import validationSchema from "../../utils/validationSchemas";

const MoneyTransferForm = ({ web3, accounts, setBalance, balance }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFieldFocus = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const { recipient, sum } = values;
    try {
      await web3.eth.sendTransaction({
        from: accounts[0],
        to: recipient,
        value: web3.utils.toWei(sum.toString(), "ether"),
      });
      setSuccessMessage("Money transfer successful!");

      const updatedBalance = await getAccountBalance(web3, accounts[0]);
      setBalance(updatedBalance);
      setSubmitting(false);
    } catch (error) {
      console.error("Transfer error: ", error);
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
              <Field
                as={Input}
                type="text"
                name="recipient"
                id="recipient"
                onFocus={handleFieldFocus}
              />
              <ErrorMessage name="recipient" component={ErrorText} />
            </div>
            <div>
              <Label htmlFor="sum">Token Amount:</Label>
              <Field
                as={Input}
                type="number"
                name="sum"
                id="sum"
                onFocus={handleFieldFocus}
              />
              <ErrorMessage name="sum" component={ErrorText} />
            </div>
            <SubmitButton
              type="submit"
              disabled={!isValid || !dirty || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <ThreeCircles
                    height="25"
                    width="145"
                    color="#1E71FF"
                    visible={true}
                    ariaLabel="three-circles-rotating"
                  />
                </>
              ) : (
                "Perform Transfer"
              )}
            </SubmitButton>

            {successMessage && (
              <SuccessMessageStyled>{successMessage}</SuccessMessageStyled>
            )}
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
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
