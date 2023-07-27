import * as Yup from "yup";

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
        return value >= minAmount && value <= maxAmount;
      }),
    recipient: Yup.string()
      .required("Recipient is required")
      .matches(/^0x[0-9A-Fa-f]{40}$/, "Invalid Ethereum wallet address")
      .test(
        "validAddress",
        "Invalid Ethereum wallet address checksum",
        function (value) {
          return (
            web3.utils.isAddress(value) &&
            web3.utils.checkAddressChecksum(value)
          );
        }
      ),
  });

export default validationSchema;
