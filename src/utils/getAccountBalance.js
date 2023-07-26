export const getAccountBalance = async (web3, account) => {
  const balance = await web3.eth.getBalance(account);
  return web3.utils.fromWei(balance, "ether");
};
