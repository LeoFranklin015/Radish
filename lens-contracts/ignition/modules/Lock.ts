// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LockModule = buildModule("LockModule", (m) => {
  const name = m.getParameter("name", "USD Coin");
  const symbol = m.getParameter("symbol", "USDC");

  const lock = m.contract("Lock", [name, symbol]);

  return { lock };
});

export default LockModule;
