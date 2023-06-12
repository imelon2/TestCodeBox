const { ethers } = require("hardhat")
require('dotenv').config();

async function Deploy_Proxy(LogicCA,data,signer) {
    console.log(`Proxy Contract Deploy 진행 ....`);
    const Proxy = await ethers.getContractFactory("ERC1967Proxy")
    const proxy = await Proxy.connect(signer).deploy(LogicCA,data);

    return proxy.address;

}

module.exports = {Deploy_Proxy}
