const { ethers, upgrades } = require("hardhat")
const { Deploy_Proxy } = require("./Proxy");
const abi = require('../../artifacts/contracts/Treasury.sol/Treasury.json').abi

async function deploy_Treasury(TokenCA,signer) {
    // const Treasury = (await ethers.getContractFactory("Treasury")).connect(signer);
    // const treasury = await upgrades.deployProxy(Treasury,[TokenCA],{initializer: 'initialize',kind:'uups'});
    console.log(`Treasury Contract Deploy 진행 ....`);
    const inferface = ethers.Contract.getInterface(abi);
    const Treasury = await ethers.getContractFactory("Treasury")
    const treasury = await Treasury.connect(signer).deploy();
    await treasury.deployed();

    const data = inferface.encodeFunctionData('initialize',[TokenCA]);
    const address = await Deploy_Proxy(treasury.address,data,signer)
    console.log(`Treasury Proxy Contract : ${address}`);

    return address;
}


module.exports = {deploy_Treasury}