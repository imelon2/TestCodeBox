const {ethers} = require('ethers');
const { PermitHashStruct } = require('./util/ERC2612');
const { _domainSeparatorV4 ,_hashTypedDataV4} = require('./util/EIP712');
const {keccak256,toUtf8Bytes,solidityPacked} = ethers
const abi = ethers.AbiCoder.defaultAbiCoder();

const permitMsg = (_verifyingContract,_name,_ownerAddress,_spenderAddress,_privateKey) => {
    // Domain 데이터(EIP712)
    const name = _name;
    const version = "1";
    const chainId = 1;
    const verifyingContract = _verifyingContract;
    
    // Permit 데이터
    const ownerAddress = _ownerAddress
    const spenderAddress = _spenderAddress
    // const value = ethers.parseUnits("100").toString() // 10 token
    const value = "100" // 10 token
    const nonce = 0;
    const deadline = new Date().getTime() + (15 * 60 * 1000)
    
    console.log("deadline : "+deadline);
    console.log("value : "+value);
    
    PermitHashStruct(ownerAddress,spenderAddress,value,nonce,deadline);
    
    const msgHash = _hashTypedDataV4(_domainSeparatorV4(name, version, chainId, verifyingContract), PermitHashStruct(ownerAddress,spenderAddress,value,nonce,deadline));
    
    
    const privateKey = _privateKey
    // 개인키 서명
    const signer = new ethers.Wallet(privateKey);
    const sig = signer.signingKey.sign(msgHash) 
    
    console.log("sig.v:" + sig.v);
    console.log("sig.r: " + sig.r.toString('hex'));
    console.log("sig.s: " + sig.s.toString('hex'));
    
    // console.log(sig.serialized);

}

module.exports = {permitMsg}