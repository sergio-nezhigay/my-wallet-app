import React, { useState } from "react";
import Web3 from "web3";
import { getAccountBalance } from "./getAccountBalance";

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

        setConnectionInfo(
          `${balance} ${accounts.length > 0 ? accounts[0] : ""}`
        );
      } catch (error) {
        console.error(error);
        setConnectionInfo(`Connection error: ${error}`);
      }
    } else {
      setConnectionInfo("Web3 not available");
    }
  };

  return <span onClick={connectWeb3}>{connectionInfo}</span>;
}
