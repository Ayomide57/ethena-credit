## EthenaCredit

## Title
EthenaCredit is an undercollateralized cross chain lending platform that allows users to borrow amounts exceeding the value of their collateral. 

# How it works
Users can deposit the USDe token as collateral, making them eligible to borrow at a 1:1.5 ratio, where the loan amount equals the collateral plus half of its value (Loan Amount = Collateral + Collateral/2). The deposited USDe tokens are staked into the Staked USDe contract, generating staking rewards. These rewards are utilized to offset the user’s loan in case of default, providing an additional layer of security for the platform.


Overcollateralized lending protocols like AAVE provide users with the ability to borrow assets by locking collateral that exceeds the loan value, ensuring the security and solvency of the platform. While this model minimizes risk for lenders, it presents several challenges:



## Problem Statement

Title: Over Collateralise Lending Protocol 

Capital Inefficiency: Users are required to overcollateralize loans, often locking up more assets than they wish to borrow, which limits capital utilization and discourages participation from users with limited resources.

Volatility Risk: The reliance on volatile cryptocurrencies as collateral creates liquidation risks, especially during rapid market downturns, which can lead to significant losses for borrowers.

Complexity for New Users: Navigating decentralized finance (DeFi) protocols like AAVE can be intimidating for newcomers due to intricate user interfaces, lack of clarity in risk parameters, and limited educational resources.

Limited Accessibility: High collateral requirements exclude potential borrowers with insufficient capital, reducing inclusivity and preventing broader adoption of DeFi lending.

Liquidity Management: Maintaining adequate liquidity to fulfill borrowing demands while ensuring sufficient returns for lenders remains a balancing act, particularly during periods of high market volatility.


Proposed Solution
To address these challenges, we propose the following solutions:


## Project Information

- **Name:** EthenaCredit
- **Title:** EthenaCredit
- **Version:** 0.0.1
- **Summary:** Undercollateralized lending platform that allows users to borrow amounts exceeding the value of their collateral


## Process 


## Features Yet to be Implemented

SmartContract
1. The EthenaCreditBle contract is currently not fully operational. While users can deposit their collateral into the EthenaCredit Sepolia contract, the LzReceive function in the EthenaCredit contract is not yet functional due to technical challenges. The LzReceive function is a critical component responsible for transferring users' deposits from BLE testnets and depositing their collateral into the sUSDe contract.

User -> deposit collateral on Sepolia Network -> EthenaCredit Smart Contract calls deposit function on sUSDe smartcontract (lzReceive)

2. lzReceive Function: this function enables EthenaCreditBle to initiate CoolDownAsset and unstake function on sUSDe SmartContract
The EthenaCreditBle contract interacts with the EthenaCredit contract by invoking the lzReceive function. This function initiates the cooldown process for assets on the sUSDe contract within the Sepolia network, unstakes the assets, and returns the corresponding amount to the lzReceive function in the EthenaCreditBle smart contract.

## Author Information

- **Author:** Quadri Lekan Ayomide Aderojuola
- **GitHub:** [Ayomide](https://github.com/Ayomide57/)
- **Email:** [aderojuolaayomide57@gmail.com](mailto:aderojuolaayomide57@gmail.com)
- **Email:** [quadriaderojuola@gmail.com](mailto:quadriaderojuola@gmail.com)
- **Git Repository:** [ethena-credit](https://github.com/Ayomide57/ethena-credit)
- **Mentor:** 0xaman (Smart contract Auditor)
- **UI/UX:** Dani


## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contract Addresses

EthenaCredit Contract is deployed to [0xcACe89Dc6dBcEC43E449EbAb86E62b2d2C71F24e] on Sepolia
Deployer: [0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef]
Transaction hash: 0x0d9833f208654ca7b2a37cab2c636c95a4c15f3a56f51ab5354872be1f116c7c
(https://sepolia.etherscan.io/tx/0x0d9833f208654ca7b2a37cab2c636c95a4c15f3a56f51ab5354872be1f116c7c) on Sepolia.


EthenaCreditBle Contract is deployed to [0x5626049933b6Ca9642023D57eaBAd2030a285eb9] on Ble Testnet
Deployer: [0x78078EdDaAa3a5a07aaE04b45AdB44599FC50aef]
Transaction hash: 0x45e1f33a4dad088bef962b75b2a5bcd2e7d810bc9876008632b7bdf1a211f703
(https://testnet.explorer.ethena.fi/tx/0x45e1f33a4dad088bef962b75b2a5bcd2e7d810bc9876008632b7bdf1a211f703) on Ble Testnet.

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge create --legacy --rpc-url https://sphinx.shardeum.org/ --private-key <your_private_key> src EthenaCreditContract.sol:EthenaCreditContract
$ forge create --legacy --rpc-url https://sphinx.shardeum.org/ --private-key <your_private_key> src/Registrar.sol:Registrar

```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
