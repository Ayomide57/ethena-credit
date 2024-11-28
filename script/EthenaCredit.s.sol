// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {EthenaCredit} from "../src/EthenaCredit.sol";

contract EthenaCreditScript is Script {

    address public USDe = 0xf805ce4F96e0EdD6f0b6cd4be22B34b92373d696;
    address public sUSDe = 0x1B6877c6Dac4b6De4c5817925DC40E2BfdAFc01b;
    bytes32 priceFeedId = 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace; // ETH/USD
    address pythContract = 0xDd24F84d36BF92C65F92307595335bdFab5Bbd21;
    address sepoliaEndpoint = 0x6EDCE65403992e310A62460808c4b910D972f10f;
    address bleEndpoint = 0x6Ac7bdc07A0583A362F1497252872AE6c0A5F5B8;
    uint bleEid = 40330;
    uint sepoliaEid = 40161;

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        EthenaCredit ethenaCredit = new EthenaCredit(USDe, sUSDe, pythContract, priceFeedId, 10);

        vm.stopBroadcast();
    }
}


//forge script --chain sepolia script/EthenaCredit.s.sol:EthenaCreditScript --rpc-url $SEPOLIA_RPC_URL2 --broadcast --sender 0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef --verify $ETHERSCAN_API_KEY --legacy -vvvv
