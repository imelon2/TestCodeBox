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
            { name: 'from', type: 'From' },
            { name: 'to', type: 'To' },
        ],
        From: [
            { name: 'name', type: 'string' },
            { name: 'wallets', type: 'address[]' },
        ],
        To: [
            { name: 'name', type: 'string' },
            { name: 'wallets', type: 'address[]' },
        ]
    },
    primaryType: 'Mail',
    domain: {
        name: 'Ether Mail',
        version: '1',
        chainId: 1,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    },
    message: {
        from: {
            name:'steve',
            wallets: [
                '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
                '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
            ]
        },
        to: {
            name:'alice',
            wallets: [
                '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
                '0xB0B0b0b0b0b0B000000000000000000000000000',
            ]
        }
    },
};

const domainSeparator = () => {
    const {name,version,chainId,verifyingContract} = typedData.domain
    const DomainTypehash = keccak256(toUtf8Bytes("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"))
    const nameHash = keccak256(toUtf8Bytes(name))
    const versionHash = keccak256(toUtf8Bytes(version))

    return keccak256(abi.encode(["bytes32","bytes32","bytes32","uint256","address"],[DomainTypehash,nameHash,versionHash,chainId,verifyingContract]))
}

const encodeFrom = () => {
    const {name,wallets} = typedData.message.from
    const nameHash = keccak256(toUtf8Bytes(name))
    const walletsHash = keccak256(solidityPacked(["address[]"],[wallets]))

    const fromTypeHash = keccak256(toUtf8Bytes("From(string name,address[] wallets)"))
    return abi.encode(['bytes32','bytes32','bytes32'],[fromTypeHash,nameHash,walletsHash])
}

const encodeTo = () => {
    const {name,wallets} = typedData.message.to
    const nameHash = keccak256(toUtf8Bytes(name))
    const walletsHash = keccak256(solidityPacked(["address[]"],[wallets]))

    const fromTypeHash = keccak256(toUtf8Bytes("To(string name,address[] wallets)"))
    return abi.encode(['bytes32','bytes32','bytes32'],[fromTypeHash,nameHash,walletsHash])
}

const hashStruct = () => {
    const mailTypeHash = keccak256(toUtf8Bytes("Mail(From from,To to)From(string name,address[] wallets)To(string name,address[] wallets)"))
    const from = keccak256(encodeFrom())
    const to = keccak256(encodeTo())
    return keccak256(abi.encode(['bytes32','bytes32','bytes32'],[mailTypeHash,from,to]))
}


const signTypedData_v4 = () => {
    return keccak256(solidityPacked(['string','bytes32','bytes32'],["\x19\x01",domainSeparator(),hashStruct()]))
}



const privateKey = "0x972edabc1b1da76e68b2979f31e7fccb66a42fcc21abf18df6a361b2403c818e"

// 개인키 서명
const signer = new ethers.Wallet(privateKey);
const sig = signer.signingKey.sign(signTypedData_v4())

console.log("sig.v:" + sig.v);
console.log("sig.r: " + sig.r.toString('hex'));
console.log("sig.s: " + sig.s.toString('hex'));


// ethers.js signTypedData_v4 서명 함수 지원
signer.signTypedData(typedData.domain,{
    Mail:typedData.types.Mail,
    From:typedData.types.From,
    To: typedData.types.To
},typedData.message).then((data) => {
    console.log(data);
})

// 서명 검증 : recover
const publicAddress = signer.address
const recover = ethers.recoverAddress(signTypedData_v4(),sig)

console.log(recover == publicAddress);

// [["steve",["0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826","0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF"]],["alice",["0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB","0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57","0xB0B0b0b0b0b0B000000000000000000000000000"]]]

