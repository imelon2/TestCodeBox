const {ethers} = require('ethers');
const {keccak256,toUtf8Bytes,solidityPacked} = ethers
const abi = ethers.AbiCoder.defaultAbiCoder();

const typedData = {
    types: {
        EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
        ],
        Mail: [
            { name: 'from', type: 'address' },
            { name: 'to', type: 'address' },
            { name: 'contents', type: 'string' }
        ],
    },
    primaryType: 'Mail',
    domain: {
        name: 'Ether Mail',
        version: '1',
        chainId: 1,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    },
    message: {
        from: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
        to: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
        contents: 'Hello, Bob!',
    },
};

const domainSeparator = () => {
    const {name,version,chainId,verifyingContract} = typedData.domain
    const DomainTypehash = keccak256(toUtf8Bytes("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"))
    const nameHash = keccak256(toUtf8Bytes(name))
    const versionHash = keccak256(toUtf8Bytes(version))

    return keccak256(abi.encode(["bytes32","bytes32","bytes32","uint256","address"],[DomainTypehash,nameHash,versionHash,chainId,verifyingContract]))
}


const hashStruct = () => {
    const MailTypeHash = keccak256(toUtf8Bytes("Mail(address from,address to,string contents)"))

    const contentsHash = keccak256(toUtf8Bytes(typedData.message.contents))

    return keccak256(abi.encode(['bytes32','address','address',"bytes32"],[MailTypeHash,typedData.message.from,typedData.message.to,contentsHash]))
}

const signTypedData_v4 = () => {
    return keccak256(solidityPacked(['string','bytes32','bytes32'],["\x19\x01",domainSeparator(),hashStruct()]))
}

console.log("message hash : "+signTypedData_v4());
// public : 0xd644352A429F3fF3d21128820DcBC53e063685b1
const privateKey = "0x972edabc1b1da76e68b2979f31e7fccb66a42fcc21abf18df6a361b2403c818e"

// 개인키 서명
const signer = new ethers.Wallet(privateKey);
const sig = signer.signingKey.sign(signTypedData_v4())
console.log("sig.v: " + sig.v);
console.log("sig.r: " + sig.r.toString('hex'));
console.log("sig.s: " + sig.s.toString('hex'));


// ethers.js signTypedData_v4 서명 함수 지원
signer.signTypedData(typedData.domain,{Mail:typedData.types.Mail},typedData.message).then((data) => {
    console.log(data);
})

// const publicAddress = signer.address
// const recover = ethers.recoverAddress(signTypedData_v4(),sig)

// console.log(recover == publicAddress);