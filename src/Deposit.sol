// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "forge-std/console.sol";

contract Deposit {

    address public USDe = 0xf805ce4F96e0EdD6f0b6cd4be22B34b92373d696;
    address public sUSDe = 0x1B6877c6Dac4b6De4c5817925DC40E2BfdAFc01b;

    function approvesUSDeToSpendUSDe(uint256 _amount) payable public returns(bool success){
        require(IERC20(USDe).approve(address(sUSDe), _amount), "Approve Failed");
        return true;
    }

    // Call approvesUSDeToSpendUSDe when user add collateral and deposit users token using contract address 

    function depositUSDeIntosUSDe(uint256 _amount) payable public returns(bool success){
        IERC20(USDe).transferFrom(msg.sender, address(this),_amount);
        (bool sent, bytes memory data)= sUSDe.call(abi.encodeWithSignature("deposit(uint256,address)", _amount, msg.sender));
        console.logBytes(data);
        require(sent , "failed");
        return sent;
    }
}