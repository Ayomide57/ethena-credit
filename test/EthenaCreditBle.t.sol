// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import "forge-std/console.sol";

import {EthenaCreditBle} from "../src/EthenaCreditBle.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EthenaCreditTest is Test {
    address public USDe = 0x426E7d03f9803Dd11cb8616C65b99a3c0AfeA6dE;
    address public sUSDe = 0x80f9Ec4bA5746d8214b3A9a73cc4390AB0F0E633;

    EthenaCreditBle public ethenaCredit;

    // parameters for an option
    uint256 useramount = 50e18;
    uint256 amount = 20e18;
    uint256 loan_amount = 25e18;
    address user = makeAddr("user");
    bytes32 priceFeedId = 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace; // ETH/USD
    address pythContract = 0xDd24F84d36BF92C65F92307595335bdFab5Bbd21;

    function setUp() public {
        ethenaCredit = new EthenaCreditBle(USDe, sUSDe, pythContract, priceFeedId, 10);
    }

    function testAddCollateral() public {

        deal(USDe, user, useramount);

        vm.startPrank(user);

        //approve sUSDe contract to spend users USDe
        IERC20(USDe).approve(address(sUSDe), amount);
        //add collateral and deposit user's USDe into sUSDe contract using ethenaCredit as depositor's address
        ethenaCredit.addCollateral(amount);
        console.logUint(IERC20(USDe).balanceOf(address(ethenaCredit)));
        vm.stopPrank();
    }

    function testLoanRequest() public {
        deal(USDe, user, useramount);
        deal(USDe, address(ethenaCredit), useramount);
        vm.startPrank(user);
        //IERC20(USDe).transferFrom(user, address(ethenaCredit), amount);
        console.logUint(IERC20(USDe).balanceOf(address(ethenaCredit)));
        IERC20(USDe).approve(address(sUSDe), amount);
        IERC20(USDe).approve(address(ethenaCredit), amount);
        ethenaCredit.addCollateral(amount);
        console.logUint(IERC20(USDe).balanceOf(address(ethenaCredit)));
        uint _collateral_id = ethenaCredit._collateral_ids();
         
        //loan request 
        uint _old_loan_id = ethenaCredit._loan_ids();
        ethenaCredit.loanRequest(_collateral_id, loan_amount, 1 days);
        uint _loan_id = ethenaCredit._loan_ids();
        assertEq(_old_loan_id + 1, _loan_id);
        vm.stopPrank();
    }

    //forge test --fork-url https://testnet.rpc.ethena.fi/ --mt testLoanRequest -vvvvv

    function testInvest() public {

        address myuser = 0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef;
        //address myuser = 0x9339C5dEEE360d0E352C7E43C9256C7DdC97D37F;
        uint256 deposit = 1000000000000000000;

        vm.startPrank(myuser);

        uint256 userPrevBalance = IERC20(USDe).balanceOf(myuser) - deposit;
        // approve deposit contract
        IERC20(USDe).approve(address(ethenaCredit), deposit);
        console.logUint(IERC20(USDe).balanceOf(myuser));
        ethenaCredit.invest(deposit, 1 days);
        assertEq(IERC20(USDe).balanceOf(address(ethenaCredit)), 0);
        console.logUint(IERC20(USDe).balanceOf(address(ethenaCredit)));
        console.log("user" , IERC20(USDe).balanceOf(myuser));
        assertEq(IERC20(USDe).balanceOf(myuser), userPrevBalance);

        vm.stopPrank();
    }

//forge test --fork-url https://testnet.rpc.ethena.fi/ --mt testInvest -vvvvv

    function testInvestAndWithdraw() public {
        address myuser = 0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef;
        uint256 deposit = 1000000000000000000;
        deal(USDe, address(ethenaCredit), 2000000000000000000);
        vm.startPrank(myuser);
        uint256 userPrevBalance = IERC20(USDe).balanceOf(myuser) - deposit;
        // approve deposit contract
        IERC20(USDe).approve(address(ethenaCredit), deposit);

        // invest contract
        ethenaCredit.invest(deposit, 1 days);
        assertEq(IERC20(USDe).balanceOf(myuser), userPrevBalance);

        //_investment_ids 
        uint _investment_id = ethenaCredit._investment_ids() - 1;

        ethenaCredit.withdrawInvestment(_investment_id);

        vm.stopPrank();

    }
//forge test --fork-url https://testnet.rpc.ethena.fi/ --mt testInvestAndWithdraw -vvvvv

    function testAddCollateralAndWithdraw() public {

        deal(USDe, user, useramount);

        vm.startPrank(user);

        //approve sUSDe contract to spend users USDe
        IERC20(USDe).approve(address(sUSDe), amount);
        IERC20(USDe).approve(address(ethenaCredit), amount);

        //add collateral and deposit user's USDe into sUSDe contract using ethenaCredit as depositor's address
        ethenaCredit.addCollateral(amount);
        console.logUint(IERC20(USDe).balanceOf(address(ethenaCredit)));

        //_collateral_id
        uint _collateral_id = ethenaCredit._collateral_ids();
        ethenaCredit.withdrawCollateral(_collateral_id);
        console.logUint(IERC20(USDe).balanceOf(address(ethenaCredit)));
        assertEq(IERC20(USDe).balanceOf(address(ethenaCredit)), 0);

        vm.stopPrank();
    }
//forge test --fork-url https://testnet.rpc.ethena.fi/ --mt testAddCollateralAndWithdraw -vvvvv


    function testLoanRequestAndWithdrawLoan() public {
        deal(USDe, user, useramount);
        deal(address(ethenaCredit), 10 ether);
        deal(USDe, address(ethenaCredit), useramount);
        vm.startPrank(user);

        IERC20(USDe).approve(address(sUSDe), amount);
        IERC20(USDe).approve(address(ethenaCredit), amount);
        //console
        console.log("before collateral");
        console.logUint(IERC20(USDe).balanceOf(address(ethenaCredit)));
        console.logUint(address(ethenaCredit).balance);
        console.logUint(IERC20(USDe).balanceOf(user));
        console.log("user eth", user.balance);

        ethenaCredit.addCollateral(amount);
        console.log("_collateral_id", ethenaCredit._collateral_ids());
        uint _collateral_id = ethenaCredit._collateral_ids() - 1;

        //console
        console.log("after collateral");
        console.logUint(IERC20(USDe).balanceOf(address(ethenaCredit)));
        console.logUint(address(ethenaCredit).balance);
        console.logUint(IERC20(USDe).balanceOf(user));

         
        //loan request 
        ethenaCredit.loanRequest(_collateral_id, loan_amount, 1 days);
        uint _loan_id = ethenaCredit._loan_ids() - 1;
        //assertEq(_old_loan_id - 1, _loan_id);
        ethenaCredit.withdrawLoan(_loan_id, _collateral_id);

        console.log("after withdrawLoan");
        console.logUint(IERC20(USDe).balanceOf(address(ethenaCredit)));
        console.logUint(address(ethenaCredit).balance);
        console.logUint(IERC20(USDe).balanceOf(user));
        console.log("user eth", user.balance);

        vm.stopPrank();

    }
//forge test --fork-url https://testnet.rpc.ethena.fi/ --mt testLoanRequestAndWithdrawLoan -vvvvv


    function testRequestAndWithdrawAndRepayLoan() public {
        deal(USDe, user, useramount);
        deal(address(ethenaCredit), 10 ether);
        deal(USDe, address(ethenaCredit), useramount);
        vm.startPrank(user);

        IERC20(USDe).approve(address(sUSDe), amount);
        IERC20(USDe).approve(address(ethenaCredit), amount);

        ethenaCredit.addCollateral(amount);
        console.log("_collateral_id", ethenaCredit._collateral_ids());
        uint _collateral_id = ethenaCredit._collateral_ids() - 1;

         
        //loan request 
        ethenaCredit.loanRequest(_collateral_id, loan_amount, 1 days);
        uint _loan_id = ethenaCredit._loan_ids() - 1;
        //assertEq(_old_loan_id - 1, _loan_id);
        ethenaCredit.withdrawLoan(_loan_id, _collateral_id);

        IERC20(USDe).approve(address(ethenaCredit), loan_amount);
        ethenaCredit.payLoan(_loan_id, _collateral_id, loan_amount);
        console.log("after payLoan");
        console.logUint(IERC20(USDe).balanceOf(address(ethenaCredit)));
        console.logUint(address(ethenaCredit).balance);
        console.logUint(IERC20(USDe).balanceOf(user));
        console.log("user eth", user.balance);


        vm.stopPrank();

    }

    //forge test --fork-url https://testnet.rpc.ethena.fi/ --mt testRequestAndWithdrawAndRepayLoan -vvvvv


    function addressToBytes32(address _addr) public pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }

    function testQuote() public {
        address myuser = 0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef;
        vm.startPrank(myuser);
        uint32 _dstEid = 40161;
        bytes32 _to = this.addressToBytes32(0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef);
        uint256 _amountLD = 1 ether; 
        uint256 _minAmountLD = 900000000000000000; 
        bytes memory _extraOptions = hex"0003010011010000000000000000000000000000ea60"; 
        bytes memory _composeMsg = bytes("");
        bytes memory _oftCmd = bytes("");
        bool _payInLzToken = false;

        IERC20(USDe).approve(address(ethenaCredit), 2 ether);
        ethenaCredit.quoteSend(_dstEid, _to, _amountLD, _minAmountLD, _extraOptions ,_composeMsg, _oftCmd, _payInLzToken);
        vm.stopPrank();

    }



//forge test --fork-url https://testnet.rpc.ethena.fi/ --mt testQuote -vvvvv

    function testSend() public {
        address _myuser = 0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef;
        deal(USDe, address(ethenaCredit), 100 ether);
        deal(USDe, _myuser, 100 ether);
        vm.startPrank(_myuser);

        uint32 _dstEid = 40161;
        bytes32 _to = this.addressToBytes32(0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef);
        uint256 _amountLD = 1 ether; 
        uint256 _minAmountLD = 900000000000000000; 
        bytes memory _extraOptions = hex"0003010011010000000000000000000000000000ea60"; 
        bytes memory _composeMsg = bytes("");
        bytes memory _oftCmd = bytes("");
        bool _payInLzToken = false;
        //646849207630617
        IERC20(USDe).approve(address(ethenaCredit), 10 ether);
        ethenaCredit.sendData(_dstEid, _to, _amountLD, _minAmountLD, _extraOptions ,_composeMsg, _oftCmd, _payInLzToken, _myuser);
        vm.stopPrank();

    }



//forge test --fork-url https://testnet.rpc.ethena.fi/ --mt testQuote -vvvvv



}
