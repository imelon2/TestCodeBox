const {ethers} = require('ethers');
const {keccak256,toUtf8Bytes,solidityPacked} = ethers
const abi = ethers.AbiCoder.defaultAbiCoder();

type permit = {
    _ownerAddress:string;
    _spenderAddress:String;
    _value:string;
    _nonce:string|number;
    _deadline:string|number;
}

const PermitHashStruct = (data:permit) => {
    const {_deadline,_nonce,_ownerAddress,_spenderAddress,_value} = data;
    const typedData = {
        types: {
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
        message:  {
            owner: _ownerAddress,
            spender: _spenderAddress,
            value: _value,
            nonce: _nonce,
            deadline: _deadline
          }
    };

        const {owner,spender,value,nonce,deadline} = typedData.message
        const permitTypeHash = keccak256(toUtf8Bytes("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"))
    
        return keccak256(abi.encode(['bytes32','address','address','uint256',"uint256","uint256"],[permitTypeHash,owner,spender,value,nonce,deadline]))

}

module.exports = {PermitHashStruct}