import React, { useState } from "react";
import Connector from "./Connector";

import MoneyTransferForm from "./MoneyTransferForm";

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState(null);

  return (
    <>
      <h2>Logo</h2>
      <Connector
        setWeb3={setWeb3}
        setAccounts={setAccounts}
        setBalance={setBalance}
      />
      {balance && (
        <MoneyTransferForm
          web3={web3}
          accounts={accounts}
          setBalance={setBalance}
          // balance={balance}
          balance={500}
        />
      )}
    </>
  );
}

export default App;
