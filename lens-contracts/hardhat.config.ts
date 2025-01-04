import "@matterlabs/hardhat-zksync";
import "@nomicfoundation/hardhat-toolbox";

import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.24",

  zksolc: {
    version: "latest",
    settings: {},
  },

  networks: {
    // ...

    lensTestnet: {
      chainId: 37111,
      ethNetwork: "sepolia",
      url: "https://rpc.testnet.lens.dev",
      verifyURL:
        "https://block-explorer-verify.testnet.lens.dev/contract_verification",
      zksync: true,
    },

    hardhat: {
      zksync: true,
    },
  },
};

export default config;
