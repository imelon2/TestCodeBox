const { ethers, upgrades } = require("hardhat");
const { Deploy_Proxy } = require("./Proxy");
const abi = require('../../artifacts/contracts/SBTMinter.sol/SBTMinter.json').abi

async function deploy_SBTMinter(OrderRulesCA,OrderCA,signer) {
    // const SBTMinte = (await ethers.getContractFactory("SBTMinter")).connect(signer);
    // const sBTMinte = await upgrades.deployProxy(SBTMinte,[OrderRulesCA, OrderCA],{initializer: 'initialize',kind:'uups'});

    console.log(`SBTMinter Contract Deploy 진행 ....`);
    const inferface = ethers.Contract.getInterface(abi);
    const SBTMinter = await ethers.getContractFactory("SBTMinter")
    const sbtMinter = await SBTMinter.connect(signer).deploy();
    await sbtMinter.deployed();

    const data = inferface.encodeFunctionData('initialize',[OrderRulesCA, OrderCA]);
    const address = await Deploy_Proxy(sbtMinter.address,data,signer)
    // const orderRules = await upgrades.deployProxy(OrderRules,{initializer: 'initialize',kind:'uups'});

    console.log(`SBTMinter Proxy Contract : ${address}`);
    return address;

}


module.exports = {deploy_SBTMinter}