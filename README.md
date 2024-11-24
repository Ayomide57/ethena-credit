## EthenaCredit

## Title
EthenaCredit is an Undercollateralise lending platform that gives out more loan to users than their collateral. While this system provides a valuable service, several challenges hinder its efficiency and user experience:



## Problem

Title: Over Collateralise Lending Protocol 
Bullets:
Complex Application Process: The requirement for detailed property information from ChainProperty can overwhelm users, leading to incomplete submissions and delays in loan approval.

Inefficient Loan Verification: The current loan verification process may be slow, resulting in longer wait times for businesses in need of immediate financial support.

Delayed Fund Disbursement: After loan approval, ensuring prompt and accurate disbursement of funds is critical to meeting the operational needs of businesses.

Proposed Solution
To address these challenges, we propose the following solutions:

Streamlined Application Process: Simplify the application interface to guide users step-by-step through the submission of property information. Incorporate tooltips and examples to assist users in providing complete and accurate data.


Clear Payback Option Guidance: Introduce an interactive loan calculator that visually demonstrates the impact of different payback periods on monthly payments and total interest. This tool will help users make informed decisions about their loan options.

Rapid Fund Disbursement System: Develop an automated disbursement mechanism that ensures funds are released promptly after approval. Establish clear timelines for disbursement and keep users informed throughout the process.

## Project Information

- **Name:** EthenaCredit
- **Title:** EthenaCredit
- **Version:** 0.0.1
- **Summary:** The purpose of this contract is provide users can obtain more loans with less collateral.

## Process 

* Company Registration: Businesses register on the platform to apply for loans.
* Collateral: Loans secured against real-world assets (RWA).
* Flexible Payback Periods: Choose from 6, 12, 18, 24, or 36 months.

* Property Information: Gather details from ChainProperty.
* Verification: Review and approve loan applications.
* Loan Disbursement: Funds are released upon approval.
* Total Loan Amount / Number of Payment Periods = Monthly Payment

## Functional
1. User Registration
2. Adding Collateral
3. Loan Request
4. Admin can create a loan
5. Loan Disbursal (No Interface)
6. Update Loan Status
7. Investors can invest and withdraw after 1 year



## Features Yet to be Implement

Frontend
1. Query Loan Lists, Loan Request Lists, Total Users List
2. Loan Disbursal
3. Investment page





## Author Information

- **Author:** Quadri Lekan Ayomide Aderojuola
- **GitHub:** [Ayomide](https://github.com/Ayomide57/)
- **Email:** [aderojuolaayomide57@gmail.com](mailto:aderojuolaayomide57@gmail.com)
- **Email:** [quadriaderojuola@gmail.com](mailto:quadriaderojuola@gmail.com)
- **Git Repository:** [rwa-loan-collateral](https://github.com/Ayomide57/rwa-loan-collateral)
- **Mentor:** 0xaman (Smart contract Auditor)
- **UI/UX:** Dani


## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contract Addresses

EthenaCredit Contract is deployed to [0xF0367544DAfCF53649195529f687155B52098ba4] on Sepolia
Deployer: [0x15427D97E45e3374DF934B0f1292C8556D1B79DD]
Transaction hash: 0x0be9bec451fba979b54f5e6c4be53436a0bad26d93cf17bc4876b431f91beeba
(https://neoxt4scan.ngd.network/tx/0x0be9bec451fba979b54f5e6c4be53436a0bad26d93cf17bc4876b431f91beeba) on Sepolia.


Registrar Contract is deployed to [0x1bddabb544fffd89ed263b28cf5827635b60e345] on Sepolia
Deployer: [0x15427D97E45e3374DF934B0f1292C8556D1B79DD]
Transaction hash: 0x8c1403f83620bc37d931749198ad78000de1957aeb8a8b2c4c85d21536921919
(https://neoxt4scan.ngd.network/tx/0x8c1403f83620bc37d931749198ad78000de1957aeb8a8b2c4c85d21536921919) on Sepolia.

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
