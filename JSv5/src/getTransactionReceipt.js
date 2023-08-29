require('dotenv').config()
const {ethers} = require('ethers');
const provider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_PROVIDER);

async function main() {
    const tx = await provider.getTransactionReceipt("0x765e5cbe87b57b06e629b9ef94bd3b8b244be44bd5a80d0b0e8a52ddaf41675e")
    console.log(tx);
}

main();