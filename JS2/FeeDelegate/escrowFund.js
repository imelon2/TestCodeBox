const { delegatorMsg } = require("../ERC2770");
const { permitMsg } = require("../Permit")

const data = {
    admin : {
        public : "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        private : "0x503f38a9c967ed597e47fe25643985f032b072db8075426a92110f82df48dfcb"
    },
    seller : {
        public : "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
        private : "0x7e5bfb82febc4c2c8529167104271ceec190eafdca277314912eaabdb67c6e5f"
    },
    buyer : {
        public : "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
        private : "0xcc6d63f85de8fef05446ebdd3c537c72152d0fc437fd7aa62b3019b79bd1fdd4"
    },
    dka : "0x11bcD925D9c852a3eb40852A1C75E194e502D2b9",
    tusdt : "0xC4FA8Ef3914b2b09714Ebe35D1Fb101F98aAd13b",
    escrow : "0xa9d281dA3B02DF2ffc8A1955c45d801B5726661D",
    feeDelegator : "0xd7Ca4e99F7C171B9ea2De80d3363c47009afaC5F"
}

// console.log("Buyer EIP712 Signiture Info :");
// permitMsg(data.tusdt,"tUSDT",data.buyer.public,data.feeDelegator,data.buyer.private);
// console.log("\n\n\n");

// console.log("Seller EIP712 Signiture Info :");
// permitMsg(data.dka,"Dkargo",data.seller.public,data.feeDelegator,data.seller.private);
// console.log("\n\n\n");

// let buyerData = ""
// console.log("Buyer execute Signiture Info :");
// delegatorMsg(data.feeDelegator,data.buyer.public,data.tusdt,0,buyerData,data.buyer.private);
// console.log("\n\n\n");

let sellerData = "0xe8436432000000000000000000000000ab8483f64d9c6d1ecf9b849ae677dd3315835cb2000000000000000000000000d7ca4e99f7c171b9ea2de80d3363c47009afac5f000000000000000000000000a9d281da3b02df2ffc8a1955c45d801b5726661d00000000000000000000000000000000000000000000000000000000000000640000000000000000000000000000000000000000000000000000018850fdaa51000000000000000000000000000000000000000000000000000000000000001cc90ac9b711f3230ee7efb596b4226dcab5d7ad82672e917ae04acab82034f7b77e53fb7742ff4474aed65158f07d53709d6960bc1e11c6ed7ecbf40a1bee6132"
console.log("Seller execute Signiture Info :");
delegatorMsg(data.feeDelegator,data.seller.public,data.dka,0,sellerData,data.seller.private);
console.log("\n\n\n");