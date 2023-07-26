import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import Web3 from "web3";
import { getAccountBalance } from "../utils/getAccountBalance";
import { ConnectionSpan } from "../styles/Connector.styled";
const STATUS = {
  INIT: "init",
  ERROR: "error",
  INFO: "info",
};

export default function Connector({ setWeb3, setAccounts, setBalance }) {
  const [connectionInfo, setConnectionInfo] = useState({
    message: "Connect wallet",
    status: STATUS.INIT,
  });

  const connectWeb3 = async () => {
    if (connectionInfo.status !== STATUS.INIT) return;
    if (typeof window.ethereum !== "undefined") {
      try {
        setConnectionInfo({ message: "Connecting", status: "info" });
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
          message: `Connection error: ${error}`,
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
    <ConnectionSpan
      onClick={connectWeb3}
      status={connectionInfo.status}
      role="button"
      tabindex="0"
    >
      {connectionInfo.message}
    </ConnectionSpan>
  );
}

Connector.propTypes = {
  setWeb3: PropTypes.func.isRequired,
  setAccounts: PropTypes.func.isRequired,
  setBalance: PropTypes.func.isRequired,
};
