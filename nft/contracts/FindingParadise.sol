// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Address: 0x70227EB2d2AaD02b9276E03b8E09ce1Cd5142215
// IPFS Pattern: ipfs://QmRda2F6W5Uw6N6MYcZa89W7zNccw5w37AK6DiAVPrLqtE

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FindingParadise is ERC721, ERC721URIStorage, Ownable {
    constructor(address initialOwner)
        ERC721("FindingParadise", "FP")
        Ownable(initialOwner)
    {}

    function safeMint(address to, uint256 tokenId, string memory uri)
        public
        onlyOwner
    {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }


    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}