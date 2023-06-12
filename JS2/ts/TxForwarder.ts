import {ethers,providers,Signer} from 'ethers';
import * as format from './typedData';
import TxForwarder from "../artifacts/contracts/TxForwarder.sol/TxForwarder.json"

type metaTx = { 
    from:string,
    to:string,
    value:string|number,
    gas:string|number,
    nonce:number,
    data:string
 }

export class TxForwarderLibs {
    private provider: providers.JsonRpcProvider;
    private contract: ethers.Contract;
    public TxForwarderCA: string;

    constructor(
        TxForwarderCA: string,
        provider: providers.JsonRpcProvider,
    ) {
        this.provider = provider;
        this.TxForwarderCA = TxForwarderCA;
        this.contract = new ethers.Contract(TxForwarderCA, TxForwarder.abi, this.provider);
    }

    async getNonce(address:string) : Promise<BigInt> {
        return await this.contract.getNonce(address);
    }

    async signMetaTx(req:metaTx,signer:ethers.Wallet):Promise<string> {
        const domain = format.forwardRequest_domain(this.provider.network.chainId,this.TxForwarderCA);
        const types = format.forwardRequest_types();
        return signer._signTypedData(domain,types,req);
    }

    async execute(req:metaTx, signature:string,signer:Signer): Promise<string> {
        const txInfo = await this.contract.connect(signer).execute(Object.values(req), signature)
        const receipt = await txInfo.wait();
        const receiptData = JSON.stringify(receipt, null, 4);
        return receiptData;
    }
}

