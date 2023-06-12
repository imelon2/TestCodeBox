const msgParams = JSON.stringify({
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
});

const account = "0xd644352A429F3fF3d21128820DcBC53e063685b1";
const params =[account,msgParams];

await window.ethereum.request({method:"eth_signTypedData_v4",params:params})