// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
interface IOFTCoreLike {
    struct SendParam {
        uint32 dstEid; // Destination endpoint ID.
        bytes32 to; // Recipient address.
        uint256 amountLD; // Amount to send in local decimals.
        uint256 minAmountLD; // Minimum amount to send in local decimals.
        bytes extraOptions; // Additional options supplied by the caller to be used in the LayerZero message.
        bytes composeMsg; // The composed message for the send() operation.
        bytes oftCmd; // The OFT command to be executed, unused in default OFT implementations.
    }


    struct MessagingFee {
        uint256 nativeFee; // Fee amount in native gas token.
        uint256 lzTokenFee; // Fee amount in ZRO token.
    }

    struct MessagingReceipt {
        MessagingFee fee;
        bytes32 guid;
        uint64 nonce;
    }

    function quoteSend(
        SendParam calldata _sendParam,
        bool _payInLzToken
    ) external view returns (MessagingFee memory msgFee);

    function send(
        SendParam calldata _sendParam,
        MessagingFee memory fee,
        address _dstAddress
    ) external payable returns (MessagingReceipt memory receipt);


}