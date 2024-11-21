// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Deposit {

    address public USDe = 0x426E7d03f9803Dd11cb8616C65b99a3c0AfeA6dE;
    address public sUSDe = 0x80f9Ec4bA5746d8214b3A9a73cc4390AB0F0E633;

    function approvesUSDeToSpendUSDe(uint256 amount) payable public returns(bool success){
        (bool sent, ) = USDe.call{value: amount}(abi.encodeWithSignature("approve(address,uint256)", sUSDe, amount));
        return sent;
    }

    function depositUSDeIntosUSDe(uint256 amount) payable public returns(bool success){
        (bool sent, ) = USDe.call{value: amount}(abi.encodeWithSignature("deposit(uint256,address)", amount, address(this)));
        return sent;
    }


    function approveMyContract() public payable returns(bool success)
    {
        IERC20(USDe).approve(address(this), msg.value);
        return true;
    }

    function depositUSDe() public payable returns(bool success){
        IERC20(USDe).transferFrom(msg.sender, address(this), msg.value);
        return true;
    }
}