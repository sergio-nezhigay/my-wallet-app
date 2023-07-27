import React, { useState } from "react";
import Web3 from "web3";

import { getAccountBalance } from "../../utils/getAccountBalance";
import { Button } from "./Connector.styled";
import { STATUS } from "../../utils/constants";

interface IConnectorProps {
  setWeb3: (web3: Web3 | null) => void;
  setAccounts: (accounts: string[]) => void;
  setBalance: (balance: number | null) => void;
}

const Connector: React.FC<IConnectorProps> = ({
  setWeb3,
  setAccounts,
  setBalance,
}) => {
  const [connectionInfo, setConnectionInfo] = useState({
    message: "Connect wallet",
    status: STATUS.INIT,
  });

  const connectWeb3 = async () => {
    if (connectionInfo.status === STATUS.INIT) {
      setConnectionInfo({ message: "Connecting", status: STATUS.INFO });
      if (typeof window.ethereum !== "undefined") {
        try {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          if (accounts) setAccounts(accounts);

          const balance = await getAccountBalance(web3Instance, accounts[0]);
          setBalance(balance);

          const formattedBalance = parseFloat(balance.toString()).toFixed(3);
          const formattedAccountInfo = `${formattedBalance}${"\u00A0".repeat(
            5
          )}${
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
    } else if (connectionInfo.status === STATUS.INFO) {
      setWeb3(null);
      setBalance(null);
      setAccounts([]);
      setConnectionInfo({ message: "Connect wallet", status: STATUS.INIT });
    }
  };

  return (
    <>
      <Button onClick={connectWeb3} type="button" tabIndex={0}>
        {connectionInfo.message}
      </Button>
    </>
  );
};

export default Connector;
