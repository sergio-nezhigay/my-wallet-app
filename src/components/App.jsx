import { useState } from "react";
import Connector from "./Connector";

import MoneyTransferForm from "./MoneyTransferForm";
import { AppContainer, Header, Main } from "../styles/App.styled";
import logoSvg from "../images/logo.svg";

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState(null);

  return (
    <AppContainer>
      <Header>
        <img src={logoSvg} alt="Logo" width="100" />
      </Header>
      <Main>
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
      </Main>
    </AppContainer>
  );
}

export default App;
