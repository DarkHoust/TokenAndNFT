// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;

//Contract Address: 0xA18ed8010FD3ebf12659b6e3560E33D9F2070E2d

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract dFuseToken is ERC20 {
    address public owner;
    uint256 public blockReward;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(uint256 totalSupply) ERC20("dFuseToken", "dFT") {
        _mint(msg.sender, totalSupply);
        owner = msg.sender;
    }

    function _mintMinerReward() internal {
        _mint(block.coinbase, blockReward);
    }

    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        require(recipient != address(0), "ERC20: transfer to the zero address");
        require(balanceOf(msg.sender) >= amount, "ERC20: transfer amount exceeds balance");
        return super.transfer(recipient, amount);
    }


    function setBlockReward(uint256 amount) public onlyOwner {
        blockReward = amount;
    }

    function destroy(address payable recipient) public onlyOwner {
        _transfer(address(this), recipient, balanceOf(address(this)));
        (bool success,) = payable(owner).call{value: address(this).balance}("");
        if (!success) {
            revert();
        }
    }
}
