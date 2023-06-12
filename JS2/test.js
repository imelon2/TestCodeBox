const { ethers } = require('ethers');
const { _domainSeparatorV4, _hashTypedDataV4 } = require('./util/EIP712');
const { keccak256, toUtf8Bytes, solidityPacked } = ethers
const abi = ethers.AbiCoder.defaultAbiCoder();

let a = "Error(string)"

const functionSelector = keccak256(toUtf8Bytes(a)).substring(2,10)


console.log(functionSelector);