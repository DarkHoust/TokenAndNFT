const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("dFuseToken", function () {
    let dFuseToken;
    let dFuseTokenInstance;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        // Deploy dFuseToken contract before each test
        dFuseTokenInstance = await hre.ethers.deployContract("dFuseToken", [1000]);
        [owner, addr1, addr2] = await ethers.getSigners();
        await dFuseTokenInstance.waitForDeployment();
    });

    it("Should set the right owner", async function () {
        expect(await dFuseTokenInstance.owner()).to.equal(owner.address);
    });

    it("Should mint tokens to the owner upon deployment", async function () {
        const balance = await dFuseTokenInstance.balanceOf(owner.address);
        expect(balance).to.equal(1000);
    });

    it("Should allow transfer of tokens between accounts", async function () {
        await dFuseTokenInstance.transfer(addr1.address, 100);
        const ownerBalance = await dFuseTokenInstance.balanceOf(owner.address);
        const addr1Balance = await dFuseTokenInstance.balanceOf(addr1.address);
        expect(ownerBalance).to.equal(900);
        expect(addr1Balance).to.equal(100);
    });

    it("Should emit Transfer event when tokens are transferred", async function () {
        await expect(dFuseTokenInstance.transfer(addr1.address, 100))
            .to.emit(dFuseTokenInstance, 'Transfer')
            .withArgs(owner.address, addr1.address, 100);
    });

    it("Should revert if transfer amount exceeds balance", async function () {
        await expect(dFuseTokenInstance.transfer(addr1.address, 1500)).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    });    

    it("Should revert if transfer to zero address", async function () {
        await expect(dFuseTokenInstance.transfer('0x0000000000000000000000000000000000000000', 100)).to.be.revertedWith("ERC20: transfer to the zero address");
    });
});
