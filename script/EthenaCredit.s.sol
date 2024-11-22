// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {EthenaCredit} from "../src/EthenaCredit.sol";

contract DepositScript is Script {
    EthenaCredit public ethenaCredit;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        //ethenaCredit = new EthenaCredit();

        vm.stopBroadcast();
    }
}
