const {ethers,SigningKey,Wallet} =require("ethers");

const privateKey = "0x972edabc1b1da76e68b2979f31e7fccb66a42fcc21abf18df6a361b2403c818e"
// const bytes = ethers.toUtf8Bytes(privateKey)
const wallet = new Wallet(privateKey);
console.log(wallet.address);