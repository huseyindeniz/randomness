//SPDX-License-Identifier: MIT
// contracts//ARandomness.sol
pragma solidity ^0.8.4;

import "./libraries/Randomness.sol";
import "./ARandomness.sol";
import "hardhat/console.sol";

contract ExampleClient is ARandomness {
    using Randomness for Randomness.RNG;
    Randomness.RNG internal rng;
    uint8 public currentRandom;

    constructor(uint256 _prime, uint16 _iterations)
        ARandomness(_prime, _iterations)
    {}

    function prepareNewRandom() external {
        _createSeed();
    }

    function newRandom(uint256 _proof) external {
        require(_verify(_proof), "invalid proof");
        uint256 _randomness;
        uint256 _random;
        (_randomness, _random) = rng.getRandom(0, seeds[msg.sender]);
        console.log("here is your random number:", _random);
        (_randomness, _random) = rng.getRandomRange(0, 100, seeds[msg.sender]);
        console.log("here is another one between 0 and 100:", _random);
        currentRandom = uint8(_random);
    }
}
