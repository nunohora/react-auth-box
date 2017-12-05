pragma solidity ^0.4.2;

contract Cats {
  mapping(address => string) public cats;

  function addCat(string ipfsAddress) public returns (string) {
  	cats[msg.sender] = ipfsAddress;
  	return cats[msg.sender];
  }

  function getCat() public constant returns (string) {
  	return cats[msg.sender];
  }
}
