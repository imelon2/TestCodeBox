const { ethers } = require('ethers');
const { _domainSeparatorV4, _hashTypedDataV4 } = require('./util/EIP712');
const { keccak256, toUtf8Bytes, solidityPacked } = ethers
const abi = ethers.AbiCoder.defaultAbiCoder();


const delegatorMsg = (_verifyingContract,_from,_to,_nonce,_data,_privateKey) => {

    // Forwarder Domain 데이터(EIP712)
    const name = "FeeDelegator";
    const version = "1";
    const chainId = 1;
    const verifyingContract = _verifyingContract;
    
    // 메타 트랜잭션 데이터
    const metaData = {
        from: _from, // 사용자 지갑 주소
        to: _to, // 트랜잭션의 data가 실행되는 주소
        value: 0, // 송금 이더
        gas: 300000, // 사용 Gas
        nonce: _nonce, // fowarder contract nonce
        data: _data // 실행 트랜잭션
    }
    
    
    
    const hashStruct = () => {
        const { from, to, value, gas, nonce, data } = metaData;
        const ERC2770TypeHash = keccak256(toUtf8Bytes("ForwardRequest(address from,address to,uint256 value,uint256 gas,uint256 nonce,bytes data)"));
        const dataHash = keccak256(data)
        return keccak256(abi.encode(['bytes32', 'address', 'address', 'uint256', 'uint256', 'uint256', 'bytes32'], [ERC2770TypeHash, from, to, value, gas, nonce, dataHash]))
    }

    
    const msgHash = _hashTypedDataV4(_domainSeparatorV4(name, version, chainId, verifyingContract), hashStruct());

    
    // 개인키 서명
    const signer = new ethers.Wallet(_privateKey);
    const sig = signer.signingKey.sign(msgHash)
    // console.log("sig.v: " + sig.v);
    // console.log("sig.r: " + sig.r.toString('hex'));
    // console.log("sig.s: " + sig.s.toString('hex'));
    console.log(`["${_from}","${_to}","0","300000","${metaData.nonce}","${_data}"]`);
    console.log(sig.serialized);


}

module.exports = {delegatorMsg}