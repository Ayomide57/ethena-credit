// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
interface IsUSDeLike {
    function deposit(uint256 assets, address receiver) external payable returns (uint256 shares);

    function cooldownAssets(uint256 assets) external returns (uint256 shares);

    function unstake(address receiver) external;

}