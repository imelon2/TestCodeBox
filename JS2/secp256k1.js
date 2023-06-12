var EC = require('elliptic').ec;
var ec = new EC('secp256k1');



// Generate keys
var key = ec.genKeyPair();

// 개인키
const privateKey = key.getPrivate('hex')
console.log(`Private Key : 0x${privateKey}`);

// 공개키
// compact : true => 압축형 
// compact : false => 비압축형 
const publicKey = key.getPublic(false,'hex')
console.log(`Public Key : 0x${publicKey}`);


  console.log(ec.g);