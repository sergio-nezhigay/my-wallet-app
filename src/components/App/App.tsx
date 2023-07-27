import { useState } from "react";
import Web3 from "web3";

import Connector from "../Connector";
import MoneyTransferForm from "../MoneyTransferForm";
import { AppContainer, Header, Main } from "./App.styled";
import logoSvg from "../../images/logo.svg";

function App() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [balance, setBalance] = useState<number | null>(null);

  return (
    <>
      <AppContainer>
        <Header>
          <a
            href="https://github.com/sergio-nezhigay/my-wallet-app"
            rel="noreferrer"
            target="_blank"
          >
            <img src={logoSvg} alt="Logo" width="127" height="31" />
          </a>
          <Connector
            setWeb3={setWeb3}
            setAccounts={setAccounts}
            setBalance={setBalance}
          />
        </Header>
        <Main>
          {web3 && balance && (
            <MoneyTransferForm
              web3={web3}
              accounts={accounts}
              setBalance={setBalance}
              balance={balance}
            />
          )}
        </Main>
        <a
          href="https://github.com/sergio-nezhigay/my-wallet-app"
          rel="noreferrer"
          target="_blank"
        >
          Click to open github repo
        </a>
      </AppContainer>
    </>
  );
}

export default App;
