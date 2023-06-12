import {ethers,providers,Signer} from 'ethers';


export class UpgradeLibs {
    private CA: string;
    private ABI: any;
    private Provider: providers.JsonRpcProvider;
    private instance: ethers.Contract;
    constructor(
        CA:string,
        ABI:any,
        Provider:providers.JsonRpcProvider
    ) {
        this.CA = CA;
        this.ABI = ABI;
        this.Provider = Provider;
        this.instance = new ethers.Contract(this.CA,this.ABI,this.Provider)
    }

    async upgradeTo(newImplementation:string,signer:Signer) : Promise<string> {
        const txInfo = await this.instance.connect(signer).upgradeTo(newImplementation);
        const receipt = await txInfo.wait();
        const receiptData = JSON.stringify(receipt, null, 4);
        return receiptData;
    }
}