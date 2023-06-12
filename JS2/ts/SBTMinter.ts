import {ethers,providers,Signer} from 'ethers';
import SBTMinter from "../artifacts/contracts/SBTMinter.sol/SBTMinter.json"
import { UpgradeLibs } from './Upgrade';

type SBTInfo = {
    tier:string|number|bigint;
    requirement:string|number|bigint;
    uri:string;
}

export class SBTMinterLib extends UpgradeLibs {
    private provider: providers.JsonRpcProvider;
    private contract: ethers.Contract;
    public SBTMinterCA: string;

    constructor(
        SBTMinterCA: string,
        provider: providers.JsonRpcProvider,
    ) {
        super(SBTMinterCA,SBTMinter.abi,provider);
        this.provider = provider;
        this.SBTMinterCA = SBTMinterCA;
        this.contract = new ethers.Contract(SBTMinterCA, SBTMinter.abi, this.provider);
    }

    async owner() : Promise<string> {
        return await this.contract.owner();
    }

    async getRules() : Promise<SBTInfo[]> {
        return await this.contract.getRules();
    }

    async getRuleByTier(tier:number|string) : Promise<SBTInfo> {
        return await this.contract.getRuleByTier(tier);
    }

    async upgradeRules(rule:SBTInfo,signer:Signer) : Promise<string> {
        const _rule = Object.values(rule);
        const txInfo = await this.contract.connect(signer).upgradeRules(_rule)
        const receipt = await txInfo.wait();
        const receiptData = JSON.stringify(receipt, null, 4);
        return receiptData;
    }

    async upgradeBulkRules(rules:SBTInfo[],signer:Signer) : Promise<string> {
        const _rules = Object.values(rules).map((data) => Object.values(data))
        const txInfo = await this.contract.connect(signer).upgradeBulkRules(_rules)
        const receipt = await txInfo.wait();
        const receiptData = JSON.stringify(receipt, null, 4);
        return receiptData;
    }
}