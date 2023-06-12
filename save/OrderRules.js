const { ethers } = require("hardhat");
const { Deploy_Proxy } = require("./Proxy");
const abi = require('../../artifacts/contracts/OrderRules.sol/OrderRules.json').abi

async function deploy_OrderRules(signer) {
    console.log(`OrderRules Contract Deploy 진행 ....`);
    const inferface = ethers.Contract.getInterface(abi);
    const OrderRules = await ethers.getContractFactory("OrderRules")
    const orderRules = await OrderRules.connect(signer).deploy();
    await orderRules.deployed();

    const data = inferface.encodeFunctionData('initialize');
    const address = await Deploy_Proxy(orderRules.address,data,signer)
    // const orderRules = await upgrades.deployProxy(OrderRules,{initializer: 'initialize',kind:'uups'});

    console.log(`OrderRules Proxy Contract : ${address}`);
    return address;
}


module.exports = {deploy_OrderRules}