// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract Domains {
    mapping(string => address) public domains;

    mapping(string => string) public records;

    constructor() {
        console.log("Domains contract huh...noice");
    }

    function register(string calldata _name) public {
        require(domains[_name] == address(0));
        domains[_name] = msg.sender;
        console.log("%s has registered domain: %s", msg.sender, _name);
    }

    function getAddress(string calldata _name) public view returns (address) {
        return domains[_name];
    }

    function setRecord(string calldata _name, string calldata _record) public {
        require(domains[_name] == msg.sender);
        records[_name] = _record;
    }
}
