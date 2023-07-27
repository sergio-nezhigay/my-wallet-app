import Web3 from "web3";

export const getAccountBalance = async (web3: Web3, account: string) => {
  const balance = await web3.eth.getBalance(account);
  return Number(web3.utils.fromWei(balance, "ether"));
};
