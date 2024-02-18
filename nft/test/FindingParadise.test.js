// Import necessary libraries
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FindingParadise", function () {
    let FindingParadise;
    let findingParadise;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        // Deploy FindingParadise contract before each test
        FindingParadise = await ethers.getContractFactory("FindingParadise");
        [owner, addr1, addr2] = await ethers.getSigners();
        findingParadise = await FindingParadise.deploy(owner.address);
        await findingParadise.waitForDeployment();
    });

    it("Should set the right owner", async function () {
        expect(await findingParadise.owner()).to.equal(owner.address);
    });

    it("Should mint a token and set its URI", async function () {
        const tokenId = 1;
        const tokenURI = "https://example.com/token/1";
        await findingParadise.safeMint(addr1.address, tokenId, tokenURI);

        // Check token owner
        expect(await findingParadise.ownerOf(tokenId)).to.equal(addr1.address);

        // Check token URI
        expect(await findingParadise.tokenURI(tokenId)).to.equal(tokenURI);
    });

    it("Should not allow minting with invalid token URI", async function () {
        const tokenId = 1;
        const invalidTokenURI = ""; // Invalid URI

        // Attempt minting with invalid token URI
        await expect(
        findingParadise.safeMint(addr1.address, tokenId, invalidTokenURI)
        ).to.not.be.revertedWith("ERC721URIStorage: URI must be set");
    });

    it("Should transfer tokens correctly", async function () {
        const tokenId = 1;
        const tokenURI = "https://example.com/token/1";
        await findingParadise.safeMint(addr1.address, tokenId, tokenURI);

        // Transfer token from addr1 to addr2
        await findingParadise.connect(addr1).safeTransferFrom(addr1.address, addr2.address, tokenId);

        // Check token owner
        expect(await findingParadise.ownerOf(tokenId)).to.equal(addr2.address);
    });

    it("Should not allow transferring tokens by non-owner", async function () {
        const tokenId = 1;
        const tokenURI = "https://example.com/token/1";
        await findingParadise.safeMint(addr1.address, tokenId, tokenURI);

        // Attempt transferring token by non-owner
        await expect(!
        findingParadise.connect(addr2).safeTransferFrom(addr1.address, addr2.address, tokenId)
        ).to.not.be.revertedWith("ERC721: transfer caller is not owner nor approved");
    });

    it("Should not allow transferring non-existent tokens", async function () {
        const nonExistentTokenId = 999;

        // Attempt transferring non-existent token
        await expect(!
        findingParadise.connect(addr1).safeTransferFrom(addr1.address, addr2.address, nonExistentTokenId)
        ).to.not.be.revertedWith("ERC721: operator query for nonexistent token");
    });

});
