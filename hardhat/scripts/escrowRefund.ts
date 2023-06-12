import { ethers } from "hardhat";
import dotenv from "dotenv";
import {_domainSeparatorV4, _hashTypedDataV4} from "./utils/EIP712.js";
dotenv.config();


async function main() {
    const [admin,seller, buyer] = await ethers.getSigners();
    const FeeDelegatoer = await ethers.getContractAt("FeeDelegatoer",process.env.FEEDELEGATOR!)

    let _domainType = {
        _name : "Dkargo",
        _version: "1",
        _chainId : 1,
        _verifyingContract: process.env.DKARGO!
    }
    
    const domainSeparator = _domainSeparatorV4(_domainType);
    let permitType = {
        _ownerAddress:buyer.address,
        _spenderAddress:process.env.ESCROW,
        _value:"100",
        _nonce:0,
        _deadline: new Date().getTime() + (15 * 60 * 1000)
    }
    const permitHashStruct = PermitHashStruct(permitType);
    
    const hashMsg = _hashTypedDataV4(domainSeparator,permitHashStruct);

    buyer.signMessage(hashMsg)
    const sig = buyer.signMessage(hashMsg)
    // console.log("sig.v:" + sig.v);
    // console.log("sig.r: " + sig.r.toString('hex'));
    // console.log("sig.s: " + sig.s.toString('hex'));

    console.log(sig);
    

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});