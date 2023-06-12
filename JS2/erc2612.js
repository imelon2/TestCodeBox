const {ethers} = require('ethers');
const {keccak256,toUtf8Bytes,solidityPacked} = ethers
const abi = ethers.AbiCoder.defaultAbiCoder();

const ownerAddress = "0xd644352A429F3fF3d21128820DcBC53e063685b1"
const spenderAddress = "0x3328358128832A260C76A4141e19E2A943CD4B6D"
const value = ethers.parseUnits("10").toString() // 10 token
const nonce = 0;
const deadline = new Date().getTime() + (15 * 60 * 1000)

console.log("deadline : "+deadline);
console.log("value : "+value);
const typedData = {
    types: {
        EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
        ],
        Permit: [
            {
              name: "owner",
              type: "address",
            },
            {
              name: "spender",
              type: "address",
            },
            {
              name: "value",
              type: "uint256",
            },
            {
              name: "nonce",
              type: "uint256",
            },
            {
              name: "deadline",
              type: "uint256",
            },
        ],
    },
    primaryType: 'Permit',
    domain: {
        name: 'Dkargo',
        version: '1',
        chainId: 1,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    },
    message:  {
        owner: ownerAddress,
        spender: spenderAddress,
        value: value,
        nonce: nonce,
        deadline: deadline
      }
};

const domainSeparator = () => {
    const {name,version,chainId,verifyingContract} = typedData.domain
    const DomainTypehash = keccak256(toUtf8Bytes("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"))
    const nameHash = keccak256(toUtf8Bytes(name))
    const versionHash = keccak256(toUtf8Bytes(version))

    return keccak256(abi.encode(["bytes32","bytes32","bytes32","uint256","address"],[DomainTypehash,nameHash,versionHash,chainId,verifyingContract]))
}

const hashStruct = () => {
    const {owner,spender,value,nonce,deadline} = typedData.message
    const permitTypeHash = keccak256(toUtf8Bytes("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"))

    return keccak256(abi.encode(['bytes32','address','address','uint256',"uint256","uint256"],[permitTypeHash,owner,spender,value,nonce,deadline]))
}

const signTypedData_v4 = () => {
    return keccak256(solidityPacked(['string','bytes32','bytes32'],["\x19\x01",domainSeparator(),hashStruct()]))
}

console.log("Message Hash : " + signTypedData_v4());
const privateKey = "0x972edabc1b1da76e68b2979f31e7fccb66a42fcc21abf18df6a361b2403c818e"
// 개인키 서명
const signer = new ethers.Wallet(privateKey);
const sig = signer.signingKey.sign(signTypedData_v4()) 

console.log("sig.v:" + sig.v);
console.log("sig.r: " + sig.r.toString('hex'));
console.log("sig.s: " + sig.s.toString('hex'));

console.log(sig.serialized);
