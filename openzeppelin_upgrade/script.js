import '@openzeppelin/hardhat-upgrades';
import {upgrades} from 'hardhat'


async function main() {
    await upgrades.deployProxy()
}