import { useState } from "react";
import Web3 from "web3";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ThreeCircles } from "react-loader-spinner";

interface IMoneyTransferFormProps {
  web3: Web3;
  accounts: string[];
  setBalance: (balance: number | null) => void;
  balance: number;
}

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

const MoneyTransferForm: React.FC<IMoneyTransferFormProps> = ({
  web3,
  accounts,
  setBalance,
  balance,
}) => {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFieldFocus = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (
    values: { recipient: string; sum: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const { recipient, sum } = values;
    try {
      await web3?.eth.sendTransaction({
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
                  <span>Transferring... </span>
                  <ThreeCircles
                    height="25"
                    width="25"
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
