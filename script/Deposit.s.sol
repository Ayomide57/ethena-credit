// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Deposit} from "../src/Deposit.sol";

contract DepositScript is Script {
    Deposit public deposit;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        //deposit = new Deposit();

        vm.stopBroadcast();
    }
}
