// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import "forge-std/console.sol";

import {Deposit} from "../src/Deposit.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DepositTest is Test {
    address public USDe = 0xf805ce4F96e0EdD6f0b6cd4be22B34b92373d696;
    address public sUSDe = 0x1B6877c6Dac4b6De4c5817925DC40E2BfdAFc01b;

    Deposit public deposit;

    // parameters for an option
    uint256 amount = 1e18;
    address user = makeAddr("user");


    function setUp() public {
        deposit = new Deposit();
    }


    // test approve and deposit USDe
    function testApproveAndDepositUSDe() public {

        //deal(USDe, user, amount);
        uint256 privateKey = vm.envUint("DEV_PRIVATE_KEY");


        //vm.startPrank(user);
        vm.startBroadcast(privateKey);

        // approve deposit contract
        //IERC20(USDe).approve(address(deposit), amount);
        // approve sUSDe contract to spend USDe
        //assertEq(deposit.approvesUSDeToSpendUSDe(amount), true);
        ERC20(0xf805ce4F96e0EdD6f0b6cd4be22B34b92373d696).approve(0x1B6877c6Dac4b6De4c5817925DC40E2BfdAFc01b, amount);

        
        //deposit USDe into sUSDe contract
        //(bool sent, )= sUSDe.call{value: amount}(abi.encodeWithSignature("deposit(uint256,address)", amount, address(0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef)));
       // console.log(sent);
        //assertEq(sent, true);
        //vm.stopPrank();
        vm.stopBroadcast();

    }




}
//source .env
//forge test --fork-url $BLE_RPC_URL -vv


//cast send --rpc-url https://ethereum-sepolia-rpc.publicnode.com --interactive 0xf805ce4F96e0EdD6f0b6cd4be22B34b92373d696 "approve(address, uint256)" 0x1B6877c6Dac4b6De4c5817925DC40E2BfdAFc01b 1000000000000000000

//cast send --rpc-url https://rpc-ethena-testnet-0.t.conduit.xyz/KQvWMpkqSJ4djfc6MmFs7kCZXZd8pEJju --interactive 0x426E7d03f9803Dd11cb8616C65b99a3c0AfeA6dE "approve(address, uint256)" 0x80f9Ec4bA5746d8214b3A9a73cc4390AB0F0E633 1000000000000000000

//cast send --rpc-url https://rpc-ethena-testnet-0.t.conduit.xyz/KQvWMpkqSJ4djfc6MmFs7kCZXZd8pEJju --interactive 0x80f9Ec4bA5746d8214b3A9a73cc4390AB0F0E633 "deposit(uint256, address)" 1000000000000000000 "0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef"

//cast send --rpc-url https://ethereum-sepolia-rpc.publicnode.com --interactive 0x1B6877c6Dac4b6De4c5817925DC40E2BfdAFc01b "deposit(uint256, address)" 1000000000000000000 "0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef"