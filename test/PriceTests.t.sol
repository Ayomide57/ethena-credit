// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
 
import { Test, console2 } from "forge-std/Test.sol";
import { MyFirstPythContract } from "../src/Pyth.sol";
import { MockPyth } from "@pythnetwork/pyth-sdk-solidity/MockPyth.sol";
 import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract MyFirstPythContractTest is Test {
  MockPyth public pyth;
  bytes32 ETH_PRICE_FEED_ID = bytes32(uint256(0x1));
  //0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace
  bytes32 priceFeedId = 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace; // ETH/USD
  MyFirstPythContract public app;
   IPyth pyth1;

  address pythContract = 0xDd24F84d36BF92C65F92307595335bdFab5Bbd21;
  uint256 ETH_TO_WEI = 10 ** 18;
 
  function setUp() public {
    //pyth = new MockPyth(60, 1);
    app = new MyFirstPythContract(address(pyth), priceFeedId);
    pyth1 = IPyth(pythContract);

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
 
  function testMint() public {
    //setEthPrice(100);
 
    //vm.deal(address(this), ETH_TO_WEI);
    //app.mint{ value: ETH_TO_WEI / 100 }();
  }
 
 //
  function testMintRevert() public view {
    //setEthPrice(99);
    //uint fee = pyth.getUpdateFee(priceUpdate);
    //pyth.updatePriceFeeds{ value: fee }(priceUpdate);
 
    // Read the current price from a price feed if it is less than 60 seconds old.
    // Each price feed (e.g., ETH/USD) is identified by a price feed ID.
    // The complete list of feed IDs is available at https://pyth.network/developers/price-feed-ids
   // bytes32 priceFeedId = 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace; // ETH/USD
    PythStructs.Price memory price = pyth1.getPriceNoOlderThan(priceFeedId, 360000);
    console2.logInt(price.price);
      uint ethPrice18Decimals = (uint(uint64(price.price)) * (10 ** 18)) /
      (10 ** uint8(uint32(-1 * price.expo)));
    uint amount = ethPrice18Decimals / 20000000000000000000;
    uint eth = 1 ether / amount ;


    console2.log("required payment in wei");
    console2.log(ethPrice18Decimals);
    console2.log(amount);
    console2.log(eth);

//3307090000000000000000
//3296339321970000000000/
//3420.991547250000000000
//0.005847953216374269
    //vm.deal(address(this), ETH_TO_WEI);
    //vm.expectRevert();
    //app.mint{ value: ETH_TO_WEI / 100 }();
  }

//forge test --fork-url https://ethereum-sepolia-rpc.publicnode.com/ --mt testMintRevert -vvvvv


}
 