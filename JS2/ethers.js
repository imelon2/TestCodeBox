const {ethers,SigningKey,Wallet} =require("ethers");

// const privateKey = "0x972edabc1b1da76e68b2979f31e7fccb66a42fcc21abf18df6a361b2403c818e"
// const bytes = ethers.toUtf8Bytes(privateKey)
// const wallet = new Wallet(privateKey);
// console.log(wallet.address);
// let b = "140000000000000000000"
// ethers.BigNumber.from(b)
// console.log(ethers.BigNumber.from(b));

// const a = ethers.utils.parseEther('2857') / 10
// const a = Number("2857000000000000000000") / 10
const a = ethers.utils.hexZeroPad(ethers.utils.hexlify(1100000000), 32)

console.log(a);