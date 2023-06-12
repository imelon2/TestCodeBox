const { ethers } = require('ethers');
const { keccak256, toUtf8Bytes,solidityPacked } = ethers
const abi = ethers.AbiCoder.defaultAbiCoder();

type domainType = {
    _name:string;
    _version:string;
    _chainId:string|number;
    _verifyingContract:string;
}

export const _domainSeparatorV4 = (data:domainType) => {
    const {_name,_chainId,_verifyingContract,_version} = data;

    const typedData = {
        types: {
            EIP712Domain: [
                { name: 'name', type: 'string' },
                { name: 'version', type: 'string' },
                { name: 'chainId', type: 'uint256' },
                { name: 'verifyingContract', type: 'address' },
            ],
        },
        domain: {
            name: _name,
            version: _version,
            chainId: _chainId,
            verifyingContract: _verifyingContract,
        }
    };


    const { name, version, chainId, verifyingContract } = typedData.domain
    const DomainTypehash = keccak256(toUtf8Bytes("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"))
    const nameHash = keccak256(toUtf8Bytes(name))
    const versionHash = keccak256(toUtf8Bytes(version))

    return keccak256(abi.encode(["bytes32", "bytes32", "bytes32", "uint256", "address"], [DomainTypehash, nameHash, versionHash, chainId, verifyingContract]))
}

export const _hashTypedDataV4 = (_domainSeparator:string,_structHash:string) => {
    return keccak256(solidityPacked(['string','bytes32','bytes32'],["\x19\x01",_domainSeparator,_structHash]))
}
