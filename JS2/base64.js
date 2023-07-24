const {ethers,toUtf8Bytes,toUtf8String} =require("ethers");

let NFTMetaData = {
    "description": "This is Dkargo SBT token",
    "external_url" : "https://dkargo.io/",
    "image" : "https://stg-lodis.s3.ap-northeast-2.amazonaws.com/lodiscan/sbt/first-delivery.png",
    "name" : "Dkargo Carrier SBT Token"
}

let _NFTMetaData = JSON.stringify(NFTMetaData);

// let NFTMetaData_Base64 = "data:application/json;base64," + Buffer.from(_NFTMetaData).toString("base64");
// NFTMetaData_Base64 = Buffer.from(a, "base64").toString("utf-8");


let NFTMetaData_Base64_ethers_encode = "data:application/json;base64," + ethers.encodeBase64(toUtf8Bytes(_NFTMetaData))
console.log(`SBT token URL encode : ${NFTMetaData_Base64_ethers_encode}`);
NFTMetaData_Base64_ethers_encode = NFTMetaData_Base64_ethers_encode.replace("data:application/json;base64,","");
let NFTMetaData_Base64_ethers_decode = ethers.decodeBase64(NFTMetaData_Base64_ethers_encode)

let parse = JSON.parse(toUtf8String(NFTMetaData_Base64_ethers_decode))
console.log(parse.image);


