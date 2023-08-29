const {ethers} = require('ethers')

const LODIS_SBT_IMAGE_URL = {
    DEV : {
        Carrier : "https://dev-lodis.s3.ap-northeast-2.amazonaws.com/lodiscan/sbt/first-delivery.png",
        Shipper : "https://dev-lodis.s3.ap-northeast-2.amazonaws.com/lodiscan/sbt/speed-delivery.png"
    },
    STAG : {
        Carrier : "https://stg-lodis.s3.ap-northeast-2.amazonaws.com/lodiscan/sbt/first-delivery.png",
        Shipper : "https://stg-lodis.s3.ap-northeast-2.amazonaws.com/lodiscan/sbt/speed-delivery.png"
    }
}

const encodeTokenURL = (envir,subject) => {
    const NFTMetaData = {
        "description": "This is Dkargo SBT token",
        "external_url" : "https://dkargo.io/",
        "image" : LODIS_SBT_IMAGE_URL[envir][subject],
        "name" : `Dkargo ${subject} SBT`
    }

    let _NFTMetaData = JSON.stringify(NFTMetaData);
    _NFTMetaData = ethers.utils.toUtf8Bytes(_NFTMetaData)
    _NFTMetaData = "data:application/json;base64," + ethers.utils.base64.encode(_NFTMetaData)
    return _NFTMetaData;
}

const decodeTokenURL = (url) => {
    url = url.replace("data:application/json;base64,","");
    let NFTMetaData = ethers.utils.base64.decode(url)
    NFTMetaData = ethers.utils.toUtf8String(NFTMetaData)
    NFTMetaData = JSON.parse(NFTMetaData);
    return {
        description : NFTMetaData.description,
        external_url : NFTMetaData.external_url,
        image : NFTMetaData.image,
        name : NFTMetaData.name
    };
}

const URL_ENCODE = encodeTokenURL("DEV","Shipper");
console.log(`Encode URL : ${URL_ENCODE}`);

const URL_DECODE = decodeTokenURL(URL_ENCODE);
console.log(`Encode URL : ${URL_DECODE.description}`);
console.log(`Encode URL : ${URL_DECODE.external_url}`);
console.log(`Encode URL : ${URL_DECODE.image}`);
console.log(`Encode URL : ${URL_DECODE.name}`);