// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import "forge-std/console.sol";

import {EthenaCreditBle} from "../src/EthenaCreditBle.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { MockPyth } from "@pythnetwork/pyth-sdk-solidity/MockPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract EthenaCreditBleTest is Test {
    address public USDe = 0x426E7d03f9803Dd11cb8616C65b99a3c0AfeA6dE;
    address public sUSDe = 0x80f9Ec4bA5746d8214b3A9a73cc4390AB0F0E633;
    MockPyth public pyth;

    EthenaCreditBle public ethenaCreditBle;

    // parameters for an option
    uint256 useramount = 50e18;
    uint256 amount = 20e18;
    uint256 loan_amount = 25e18;
    address user = makeAddr("user");
    bytes32 priceFeedId = 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace; // ETH/USD
    address pythContract = 0x2880aB155794e7179c9eE2e38200202908C17B43;
    uint32 _dstEid = 40161;
    address endpoint = 0x6EDCE65403992e310A62460808c4b910D972f10f;

    function setUp() public {
        ethenaCreditBle = new EthenaCreditBle(USDe, sUSDe, pythContract, priceFeedId, 10);
        address _ethenaCreditSepolia = 0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef;
        ethenaCreditBle.setDestinationAddressAndEid(_ethenaCreditSepolia, _dstEid);
    }

        function createEthUpdate(
        int64 ethPrice
    ) private view returns (bytes[] memory) {
        bytes[] memory updateData = new bytes[](1);
        updateData[0] = pyth.createPriceFeedUpdateData(
        priceFeedId,
        ethPrice * 100000, // price
        10 * 100000, // confidence
        -5, // exponent
        ethPrice * 100000, // emaPrice
        10 * 100000, // emaConfidence
        uint64(block.timestamp), // publishTime
        uint64(block.timestamp) // prevPublishTime
        );
    
        return updateData;
    }
 
    function setEthPrice(int64 ethPrice) private {
        bytes[] memory updateData = createEthUpdate(ethPrice);
        uint value = pyth.getUpdateFee(updateData);
        vm.deal(address(this), value);
        pyth.updatePriceFeeds{ value: value }(updateData);
    }

//forge test --fork-url https://testnet.rpc.ethena.fi/ --match-path test/EthenaCreditBle.t.sol -vvvvv

    function testAddCollateralBle() public {

        deal(USDe, user, useramount);
        //deal(USDe, address(ethenaCreditBle), useramount);
        deal(address(ethenaCreditBle), 1 ether);

        vm.startPrank(user);

        uint256 _minAmountLD = 900000000000000000; 

        //approve sUSDe contract to spend users USDe
        IERC20(USDe).approve(address(ethenaCreditBle), useramount + _minAmountLD);

        //add collateral and deposit user's USDe into Sepolia contract
        ethenaCreditBle.addCollateral(amount, _minAmountLD);
        console.logUint(IERC20(USDe).balanceOf(address(ethenaCreditBle)));
        vm.stopPrank();
    }
//forge test --fork-url https://testnet.rpc.ethena.fi/ --mt testAddCollateralBle -vvvvv


    function testLoanRequestBle() public {
        deal(USDe, user, useramount);
        deal(USDe, address(ethenaCreditBle), useramount);
        deal(address(ethenaCreditBle), 1 ether);

        vm.startPrank(user);
        
        uint256 _minAmountLD = 900000000000000000; 
        console.logUint(IERC20(USDe).balanceOf(address(ethenaCreditBle)));
        IERC20(USDe).approve(address(sUSDe), amount);
        IERC20(USDe).approve(address(ethenaCreditBle), amount);

        ethenaCreditBle.addCollateral(amount, _minAmountLD);
        console.logUint(IERC20(USDe).balanceOf(address(ethenaCreditBle)));
        uint _collateral_id = ethenaCreditBle._collateral_ids();
         
        //loan request 
        uint _old_loan_id = ethenaCreditBle._loan_ids();
        ethenaCreditBle.loanRequest(_collateral_id - 1, loan_amount, 1 days);
        uint _loan_id = ethenaCreditBle._loan_ids();
        assertEq(_old_loan_id + 1, _loan_id);
        vm.stopPrank();
    }

//forge test --fork-url https://testnet.rpc.ethena.fi/ --mt testLoanRequestBle -vvvvv

    function testInvestBle() public {

        address myuser = 0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef;
        uint256 deposit = 1000000000000000000;
        uint256 _minAmountLD = 900000000000000000; 
        deal(address(ethenaCreditBle), 1 ether);

        vm.startPrank(myuser);

        uint256 userPrevBalance = IERC20(USDe).balanceOf(myuser) - deposit;
        // approve deposit contract
        IERC20(USDe).approve(address(ethenaCreditBle), deposit + _minAmountLD);
        console.logUint(IERC20(USDe).balanceOf(myuser));
        ethenaCreditBle.invest(deposit, _minAmountLD, 1 days);
        assertEq(IERC20(USDe).balanceOf(address(ethenaCreditBle)), 0);
        console.logUint(IERC20(USDe).balanceOf(address(ethenaCreditBle)));
        console.log("user" , IERC20(USDe).balanceOf(myuser));
        assertEq(IERC20(USDe).balanceOf(myuser), userPrevBalance);

        vm.stopPrank();
    }

//forge test --fork-url https://testnet.rpc.ethena.fi/ --mt testInvestBle -vvvvv

    function testInvestAndWithdrawBle() public {
        address myuser = 0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef;
        uint256 deposit = 1000000000000000000;
        uint256 _minAmountLD = 900000000000000000; 
        deal(USDe, address(ethenaCreditBle), 2000000000000000000);
        deal(address(ethenaCreditBle), 1 ether);

        vm.startPrank(myuser);
        uint256 userPrevBalance = IERC20(USDe).balanceOf(myuser) - deposit;
        // approve deposit contract
        IERC20(USDe).approve(address(ethenaCreditBle), deposit + _minAmountLD);

        // invest contract
        ethenaCreditBle.invest(deposit, _minAmountLD, 1 days);
        assertEq(IERC20(USDe).balanceOf(myuser), userPrevBalance);

        //_investment_ids 
        uint _investment_id = ethenaCreditBle._investment_ids() - 1;

        ethenaCreditBle.withdrawInvestment(_investment_id);

        vm.stopPrank();

    }

//forge test --fork-url https://testnet.rpc.ethena.fi/ --mt testInvestAndWithdrawBle -vvvvv

    function testAddCollateralAndWithdrawBle() public {

        deal(USDe, user, useramount);
        uint256 _minAmountLD = 900000000000000000; 
        deal(USDe, address(ethenaCreditBle), useramount + 2000000000000000000);
        deal(address(ethenaCreditBle), 1 ether);


        vm.startPrank(user);

        //approve sUSDe contract to spend users USDe
        IERC20(USDe).approve(address(ethenaCreditBle), amount);

        //add collateral and deposit user's USDe into sUSDe contract using ethenaCredit as depositor's address
        ethenaCreditBle.addCollateral(amount, _minAmountLD);
        console.logUint(IERC20(USDe).balanceOf(address(ethenaCreditBle)));

        //_collateral_id
        uint _collateral_id = ethenaCreditBle._collateral_ids();
        ethenaCreditBle.withdrawCollateral(_collateral_id);
        console.logUint(IERC20(USDe).balanceOf(address(ethenaCreditBle)));
        //assertEq(IERC20(USDe).balanceOf(address(ethenaCreditBle)), 0);

        vm.stopPrank();
    }
//forge test --fork-url https://testnet.rpc.ethena.fi/ --mt testAddCollateralAndWithdrawBle -vvvvv


    function testLoanRequestAndWithdrawLoanBle() public {
        deal(USDe, user, useramount);
        deal(address(ethenaCreditBle), 1 ether);
        deal(USDe, address(ethenaCreditBle), useramount);
        vm.startPrank(user);

        uint256 _minAmountLD = 900000000000000000; 
        IERC20(USDe).approve(address(sUSDe), amount);
        IERC20(USDe).approve(address(ethenaCreditBle), amount + _minAmountLD);
        //console
        console.log("before collateral");
        console.logUint(IERC20(USDe).balanceOf(address(ethenaCreditBle)));
        console.logUint(address(ethenaCreditBle).balance);
        console.logUint(IERC20(USDe).balanceOf(user));
        console.log("user eth", user.balance);

        ethenaCreditBle.addCollateral(amount, _minAmountLD);
        console.log("_collateral_id", ethenaCreditBle._collateral_ids());
        uint _collateral_id = ethenaCreditBle._collateral_ids() - 1;

        //console
        console.log("after collateral");
        console.logUint(IERC20(USDe).balanceOf(address(ethenaCreditBle)));
        console.logUint(address(ethenaCreditBle).balance);
        console.logUint(IERC20(USDe).balanceOf(user));

         
        //loan request 
        ethenaCreditBle.loanRequest(_collateral_id, loan_amount, 1 days);
        uint _loan_id = ethenaCreditBle._loan_ids() - 1;
        //assertEq(_old_loan_id - 1, _loan_id);
        bytes[] memory updateData = createEthUpdate(3420);

        //ethenaCreditBle.withdrawLoan(_loan_id, _collateral_id, updateData);

        console.log("after withdrawLoan");
        console.logUint(IERC20(USDe).balanceOf(address(ethenaCreditBle)));
        console.logUint(address(ethenaCreditBle).balance);
        console.logUint(IERC20(USDe).balanceOf(user));
        console.log("user eth", user.balance);

        vm.stopPrank();

    }
//forge test --fork-url https://testnet.rpc.ethena.fi/ --mt testLoanRequestAndWithdrawLoanBle -vvvvv


    function testRequestAndWithdrawAndRepayLoanBle() public {
        deal(USDe, user, useramount);
        deal(address(ethenaCreditBle), 1 ether);
        deal(USDe, address(ethenaCreditBle), useramount);
        vm.startPrank(user);

        uint256 _minAmountLD = 900000000000000000; 
        IERC20(USDe).approve(address(sUSDe), amount);
        IERC20(USDe).approve(address(ethenaCreditBle), amount + _minAmountLD);

        ethenaCreditBle.addCollateral(amount, _minAmountLD);
        console.log("_collateral_id", ethenaCreditBle._collateral_ids());
        uint _collateral_id = ethenaCreditBle._collateral_ids() - 1;

         
        //loan request 
        ethenaCreditBle.loanRequest(_collateral_id, loan_amount, 1 days);
        uint _loan_id = ethenaCreditBle._loan_ids() - 1;
        //assertEq(_old_loan_id - 1, _loan_id);
        //bytes[] memory updateData = createEthUpdate(3420);

        //ethenaCreditBle.withdrawLoan(_loan_id, _collateral_id, updateData);

        IERC20(USDe).approve(address(ethenaCreditBle), loan_amount);
        ethenaCreditBle.payLoan(_loan_id, _collateral_id, loan_amount);
        console.log("after payLoan");
        console.logUint(IERC20(USDe).balanceOf(address(ethenaCreditBle)));
        console.logUint(address(ethenaCreditBle).balance);
        console.logUint(IERC20(USDe).balanceOf(user));
        console.log("user eth", user.balance);


        vm.stopPrank();

    }
//forge test --fork-url https://testnet.rpc.ethena.fi/ --mt testRequestAndWithdrawAndRepayLoanBle -vvvvv

    function testpriceUpdate () public {
        deal(USDe, user, useramount);
        deal(address(ethenaCreditBle), 10 ether);
        deal(USDe, address(ethenaCreditBle), useramount);
        vm.startPrank(user);
        bytes[] memory updateData = createEthUpdate(3420);
        uint256 price = ethenaCreditBle.updatePrice(updateData, amount); 
    }


//forge test --fork-url https://testnet.rpc.ethena.fi/ --mt testpriceUpdate -vvvvv




}
