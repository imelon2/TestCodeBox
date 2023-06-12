const {ethers} = require('ethers');
const {keccak256,toUtf8Bytes} = ethers


const functionSelector = keccak256(toUtf8Bytes("withdraw(uint256)"))
let amount = "0.01"
amount = ethers.parseUnits(amount).toString()
amount = ethers.toBeHex(amount);


const padding = 32*4- amount.substring(2).length
const payloadData = "0x" + functionSelector.substring(2,10) + "0".repeat(padding) + amount.substring(2);

console.log(payloadData);

// const ERC1361payloadData = () => {
//     let ABI = ["function countNum(address sender)"]
//     const _abi = new ethers.Interface(ABI)
//     const calldata = _abi.encodeFunctionData("countNum", [publucKey])
//     console.log(calldata);
    
//     return calldata;
// }