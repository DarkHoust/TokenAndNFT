const hre = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
    /*
    DeployContract in ethers.js is an abstraction used to deploy new smart contracts,
    so Contract here is a factory for instances of our contract.
    */
    // here we deploy the contract
    const Contract = await hre.ethers.deployContract("dFuseToken", [
        1000000000
    ]);

    await Contract.waitForDeployment();

    // print the address of the deployed contract
    console.log("Contract Address:", Contract.target);
}

// Call the main function and catch if there is any error
main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});