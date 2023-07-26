import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import Web3 from "web3";
import { getAccountBalance } from "../utils/getAccountBalance";
import { ConnectionSpan } from "../styles/Connector.styled";

export default function Connector({ setWeb3, setAccounts, setBalance }) {
  const [connectionInfo, setConnectionInfo] = useState("Connect wallet");

  const connectWeb3 = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        setConnectionInfo("Connecting");
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
        setConnectionInfo(formattedAccountInfo);
      } catch (error) {
        console.error(error);
        setConnectionInfo(`Connection error: ${error}`);
      }
    } else {
      setConnectionInfo("Web3 not available");
    }
  };

  return (
    <ConnectionSpan onClick={connectWeb3}>{connectionInfo}</ConnectionSpan>
  );
}

Connector.propTypes = {
  setWeb3: PropTypes.func.isRequired,
  setAccounts: PropTypes.func.isRequired,
  setBalance: PropTypes.func.isRequired,
};
