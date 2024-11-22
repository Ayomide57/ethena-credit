// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import "forge-std/console.sol";

import {EthenaCredit} from "../src/EthenaCredit.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EthenaCreditTest is Test {
    address public USDe = 0xf805ce4F96e0EdD6f0b6cd4be22B34b92373d696;
    address public sUSDe = 0x1B6877c6Dac4b6De4c5817925DC40E2BfdAFc01b;

    EthenaCredit public ethenaCredit;

    // parameters for an option
    uint256 amount = 20e18;
    uint256 loan_amount = 25e18;
    address user = makeAddr("user");


    function setUp() public {
        ethenaCredit = new EthenaCredit(USDe, sUSDe, 10);
    }

    function testAddCollateral() public {

        deal(USDe, user, amount);

        vm.startPrank(user);

        //IERC20(USDe).approve(address(ethenaCredit), amount);
        //approve sUSDe contract to spend users USDe
        IERC20(USDe).approve(address(sUSDe), amount);
        //add collateral and deposit user's USDe into sUSDe contract using ethenaCredit as depositor's address
        ethenaCredit.addCollateral(amount);
        //assertEq(IERC20(USDe).balanceOf(address(ethenaCredit)), amount);
        console.logUint(IERC20(USDe).balanceOf(address(ethenaCredit)));
        vm.stopPrank();
    }

    function testLoanRequest() public {
        deal(USDe, user, amount);
        vm.startPrank(user);

        IERC20(USDe).approve(address(sUSDe), amount);
        ethenaCredit.addCollateral(amount);
        uint _collateral_id = ethenaCredit._collateral_ids();
         
        //loan request 
        uint _old_loan_id = ethenaCredit._loan_ids();
        ethenaCredit.loanRequest(_collateral_id, loan_amount, 1 days);
        uint _loan_id = ethenaCredit._loan_ids();
        assertEq(_old_loan_id + 1, _loan_id);
        vm.stopPrank();
    }

    function testInvest() public {
        deal(USDe, user, amount);
        vm.startPrank(user);

        IERC20(USDe).approve(address(sUSDe), amount);
        ethenaCredit.invest(amount, 1 days);
        //assertEq(IERC20(USDe).balanceOf(address(ethenaCredit)), amount);
        vm.stopPrank();
    }


}