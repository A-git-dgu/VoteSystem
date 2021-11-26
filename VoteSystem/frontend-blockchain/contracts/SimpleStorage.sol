// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
  mapping(string=>uint) candidateCount;

  function voting(string memory candidates) public {
      candidateCount[candidates]++;
  }

  function countBallot(string memory candidates) view public returns (uint){
      return candidateCount[candidates];
  }
}
