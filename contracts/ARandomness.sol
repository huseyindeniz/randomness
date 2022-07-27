//SPDX-License-Identifier: MIT
// contracts//ARandomness.sol
pragma solidity ^0.8.4;

import "hardhat/console.sol";

abstract contract ARandomness {
    // large prime
    uint256 public immutable prime;
    // adjust for block finality
    uint16 public immutable iterations;
    // address -> vdf seed
    mapping(address => uint256) public seeds;
    // increment nonce to increase entropy
    uint256 private nonce;

    constructor(uint256 _prime, uint16 _iterations) {
        prime = _prime;
        iterations = _iterations;
    }

    function _createSeed() internal {
        // create a pseudo random seed as the input
        unchecked {
            ++nonce;
        }
        seeds[msg.sender] = uint256(
            keccak256(
                abi.encodePacked(
                    msg.sender,
                    nonce,
                    block.timestamp,
                    blockhash(block.number - 1)
                )
            )
        );
    }

    function _verify(uint256 _proof) internal view returns (bool) {
        uint256 _seed = seeds[msg.sender];
        uint256 proof = _proof;
        for (uint256 i; i < iterations; ) {
            proof = mulmod(proof, proof, prime);
            unchecked {
                ++i;
            }
        }
        _seed %= prime;
        if (_seed == proof) return true;
        if (prime - _seed == proof) return true;
        return false;
    }
}
