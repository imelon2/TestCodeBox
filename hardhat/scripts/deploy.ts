import { ethers } from "hardhat";

async function main() {
    const [admin,seller, buyer] = await ethers.getSigners();
    const _FeeDelegatoer = await ethers.getContractFactory("FeeDelegatoer");
    const FeeDelegatoer = await _FeeDelegatoer.connect(admin).deploy();
    console.log("FeeDelegatoer deployed to:", FeeDelegatoer.address);
    
    const _Dkargo = await ethers.getContractFactory("Dkargo");
    const Dkargo = await _Dkargo.connect(admin).deploy();
    console.log("Dkargo deployed to:", Dkargo.address);
    

    const _Escrow = await ethers.getContractFactory("EscrowContract");
    const Escrow = await _Escrow.connect(admin).deploy(seller.address,buyer.address,Dkargo.address,FeeDelegatoer.address);
    console.log("Escrow deployed to:", Escrow.address);
    
    await Dkargo.connect(admin).transfer(seller.address,100)
    await Dkargo.connect(admin).transfer(buyer.address,100)

    const sellerDKABalance = await Dkargo.balanceOf(seller.address)
    const buyerDKABalance = await Dkargo.balanceOf(buyer.address)
    const sellerETHBalance = await seller.getBalance();
    const buyerETHBalance = await seller.getBalance();
    const adminETHBalance = await admin.getBalance();

    console.log('\n\n');
    console.log(`✷ Admin Info \n  ETH Balance : ${ethers.utils.formatEther(adminETHBalance)} ETH \n`);
    console.log(`✷ Seller Info \n  DKA Balance : ${sellerDKABalance} DKA\n  ETH Balance : ${ethers.utils.formatEther(sellerETHBalance)} ETH`);
    console.log(`✷ Buyer Info \n  DKA Balance : ${buyerDKABalance} KDA\n  ETH Balance : ${ethers.utils.formatEther(buyerETHBalance)} ETH`);
    console.log('\n\n');
    
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});