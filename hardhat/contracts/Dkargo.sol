// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "./interface/IERC5528.sol";


// ERC20 Contractß
contract Dkargo is ERC20,ERC20Permit {
    using Address for address;


    constructor() ERC20("Dkargo", "DKA") ERC20Permit("Dkargo") {
        _mint(msg.sender, 100 * 10 ** decimals());
    }

}