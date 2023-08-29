const {ethers} =require("ethers");
const { SigningKey } = require("ethers/lib/utils");
const random = ethers.Wallet.createRandom();
const privateKey = random.privateKey
console.log(`🔖 privateKey : ${privateKey}`);
const wallet = new ethers.Wallet(privateKey);
console.log(`🔖 publicKey : ${wallet.address}`);

const bytes32 = ethers.utils.arrayify(privateKey)
const signingKey = new SigningKey(bytes32)
const address = ethers.utils.keccak256('0x' + signingKey.publicKey.replace('0x04',''))
console.log("🔖 publicKey : "+ "0x" + address.slice(2 + 24));
