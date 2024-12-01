// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {EthenaCreditBle} from "../src/EthenaCreditBle.sol";

contract EthenaCreditBleScript is Script {

    address public USDe = 0x426E7d03f9803Dd11cb8616C65b99a3c0AfeA6dE;
    address public sUSDe = 0x80f9Ec4bA5746d8214b3A9a73cc4390AB0F0E633;
    bytes32 priceFeedId = 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace; // ETH/USD
    address pythContract = 0x2880aB155794e7179c9eE2e38200202908C17B43;
    address sepoliaEndpoint = 0x6EDCE65403992e310A62460808c4b910D972f10f;
    address bleEndpoint = 0x6Ac7bdc07A0583A362F1497252872AE6c0A5F5B8;
    uint bleEid = 40330;
    //uint sepoliaEid = 40161;
    address endpoint = 0x6Ac7bdc07A0583A362F1497252872AE6c0A5F5B8;


    function run() external {
        uint256 deployerPrivateKey = vm.envUint("DEV_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        //address _ethenaCreditBle = 0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef;
        EthenaCreditBle ethenaCreditBle = new EthenaCreditBle(USDe, sUSDe, pythContract, priceFeedId, 10);
        vm.stopBroadcast();
    }
}


//forge script --chain 52085143 script/EthenaCreditBle.s.sol:EthenaCreditBleScript --rpc-url $BLE_RPC_URL --broadcast --sender 0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef --legacy -vvvv
