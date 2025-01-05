import { Deployer } from "@matterlabs/hardhat-zksync";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Wallet } from "zksync-ethers";
import dotenv from "dotenv";
dotenv.config();

export default async function (hre: HardhatRuntimeEnvironment) {
  // Initialize the wallet.
  const wallet = new Wallet(process.env.PRIVATE_KEY as string);

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);

  // Step 1: Deploy MockERC20
  //   const mockERC20Artifact = await deployer.loadArtifact("MockERC20");
  //   const mockUSDC = await deployer.deploy(mockERC20Artifact, [
  //     "USD Coin",
  //     "USDC",
  //   ]);
  //   console.log("MockERC20 (USDC) deployed to:", await mockUSDC.getAddress());

  //   // Step 2: Deploy YesToken
  //   const yesTokenArtifact = await deployer.loadArtifact("YesToken");
  //   const yesToken = await deployer.deploy(yesTokenArtifact, [
  //     await wallet.getAddress(),
  //   ]);
  //   console.log("YesToken deployed to:", await yesToken.getAddress());

  //   // Step 3: Deploy NoToken
  //   const noTokenArtifact = await deployer.loadArtifact("NoToken");
  //   const noToken = await deployer.deploy(noTokenArtifact, [
  //     await wallet.getAddress(),
  //   ]);
  //   console.log("NoToken deployed to:", await noToken.getAddress());

  // Step 4: Deploy RadishCore
  // const radishCoreArtifact = await deployer.loadArtifact("RadishCore");
  // const radishCore = await deployer.deploy(radishCoreArtifact, [
  //   // await mockUSDC.getAddress(),
  //   // await yesToken.getAddress(),
  //   // await noToken.getAddress(),
  //   "0x88b2DFA23505360b054baE96774b4e7C2D83ca08",
  //   "0xB7a6D76A6448B35aCfC8aDbe5E9D7FDBB3c1ebC2",
  //   "0x939a843E55da283eD4209cF9a4122F37Aff4E6cb",
  // ]);
  // console.log("RadishCore deployed to:", await radishCore.getAddress());
  // const radishCoreAddress = await radishCore.getAddress();
  // console.log("RadishCore address:", radishCoreAddress);

  // Step 5: Transfer ownership of YesToken and NoToken to RadishCore
  //   const transferOwnershipTx = yesToken.getFunction("transferOwnership");
  //   await transferOwnershipTx.send({
  //     to: await radishCore.getAddress(),
  //   });
  //   console.log("Yes Token Ownership transferred to RadishCore");
  //   const transferOwnershipTx2 = noToken.getFunction("transferOwnership");
  //   await transferOwnershipTx2.send({
  //     to: await radishCore.getAddress(),
  //   });
  //   console.log("Ownership of NoToken transferred to RadishCore");

  // Verify contract
  // await hre.run("verify:verify", {
  //   address: radishCoreAddress,
  //   constructorArguments: [
  //     // mockUSDC.getAddress(),
  //     // yesToken.getAddress(),
  //     // noToken.getAddress(),
  //     "0x88b2DFA23505360b054baE96774b4e7C2D83ca08",
  //     "0xB7a6D76A6448B35aCfC8aDbe5E9D7FDBB3c1ebC2",
  //     "0x939a843E55da283eD4209cF9a4122F37Aff4E6cb",
  //   ],
  // });

  // Verify contract
  await hre.run("verify:verify", {
    address: "0x88b2DFA23505360b054baE96774b4e7C2D83ca08",
    constructorArguments: ["USD Coin", "USDC"],
  });

  // Verify contract
  await hre.run("verify:verify", {
    address: "0xB7a6D76A6448B35aCfC8aDbe5E9D7FDBB3c1ebC2",
    constructorArguments: [await wallet.getAddress()],
  });

  // Verify contract
  await hre.run("verify:verify", {
    address: "0x939a843E55da283eD4209cF9a4122F37Aff4E6cb",
    constructorArguments: [await wallet.getAddress()],
  });

  // await yesToken.transferOwnership(radishCoreAddress);
  // console.log("Ownership of YesToken transferred to RadishCore");
  // await noToken.transferOwnership(radishCoreAddress);
  // console.log("Ownership of NoToken transferred to RadishCore");

  // // Step 6: Create a market in RadishCore
  // const question =
  //   "Will MrBeast reach 200M YouTube subscribers by March 2024?";
  // const endTime = Math.floor(Date.now() / 1000) + 86400 * 30; // 30 days from now

  // const createMarketTx = await radishCore.createMarket(question, endTime);
  // console.log("Market creation transaction:", createMarketTx.hash);

  // // Wait for the transaction to be confirmed
  // await createMarketTx.wait();
  // console.log("Market creation confirmed");
}
