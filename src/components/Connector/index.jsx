import PropTypes from "prop-types";
import { useState } from "react";
import Web3 from "web3";
import { getAccountBalance } from "../../utils/getAccountBalance";
import { ConnectionSpan, Button } from "./Connector.styled";
import { STATUS } from "../../utils/constants";

export default function Connector({ setWeb3, setAccounts, setBalance }) {
  const [connectionInfo, setConnectionInfo] = useState({
    message: "",
    status: STATUS.INIT,
  });

  const connectWeb3 = async () => {
    setConnectionInfo({ message: "Connecting", status: STATUS.INFO });
    if (typeof window.ethereum !== "undefined") {
      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccounts(accounts);

        const balance = await getAccountBalance(web3Instance, accounts[0]);
        setBalance(balance);

        const formattedBalance = parseFloat(balance).toFixed(3);

        const formattedAccountInfo = `${formattedBalance}${"\u00A0".repeat(5)}${
          accounts.length > 0
            ? accounts[0].slice(0, 5) + "..." + accounts[0].slice(-4)
            : ""
        }`;
        setConnectionInfo({
          message: formattedAccountInfo,
          status: STATUS.INFO,
        });
      } catch (error) {
        console.error(error);
        setConnectionInfo({
          message: `Connection error`,
          status: STATUS.ERROR,
        });
      }
    } else {
      setConnectionInfo({
        message: "Web3 not available",
        status: STATUS.ERROR,
      });
    }
  };

  return (
    <>
      {connectionInfo.status === STATUS.INIT ? (
        <Button onClick={connectWeb3} type="button">
          Connect wallet
        </Button>
      ) : (
        <ConnectionSpan status={connectionInfo.status}>
          {connectionInfo.message}
        </ConnectionSpan>
      )}
    </>
  );
}

Connector.propTypes = {
  setWeb3: PropTypes.func.isRequired,
  setAccounts: PropTypes.func.isRequired,
  setBalance: PropTypes.func.isRequired,
};
