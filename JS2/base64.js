const {ethers,toUtf8Bytes,toUtf8String} =require("ethers");

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

/**
 * 
 * @param {DEV,STAG} envir 
 * @param {Carrier, Shipper} subject 
 */
const encodeSBTTokenURL = (envir,subject) => {
    const NFTMetaData = {
        "description": "This is Dkargo SBT token",
        "external_url" : "https://dkargo.io/",
        "image" : LODIS_SBT_IMAGE_URL[envir][subject],
        "name" : `Dkargo ${subject} SBT`
    }

    let _NFTMetaData = JSON.stringify(NFTMetaData);
    _NFTMetaData = "data:application/json;base64," + ethers.encodeBase64(toUtf8Bytes(_NFTMetaData))
    return _NFTMetaData;
}

const decodeSBTTokenURL = (url) => {
    url = url.replace("data:application/json;base64,","");
    let NFTMetaData = ethers.decodeBase64(url)
    NFTMetaData = JSON.parse(toUtf8String(NFTMetaData));
    return {
        description : NFTMetaData.description,
        external_url : NFTMetaData.external_url,
        image : NFTMetaData.image,
        name : NFTMetaData.name
    };
}


const URL_ENCODE = encodeSBTTokenURL("DEV","Shipper");
console.log(`Encode URL : ${URL_ENCODE}`);

const URL_DECODE = decodeSBTTokenURL(URL_ENCODE);
console.log(`Encode URL : ${URL_DECODE.description}`);
console.log(`Encode URL : ${URL_DECODE.external_url}`);
console.log(`Encode URL : ${URL_DECODE.image}`);
console.log(`Encode URL : ${URL_DECODE.name}`);