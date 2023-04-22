# Randomness

Randomness is a difficult problem to solve in computer science. Due to blockchain's deterministic nature, it is even more difficult in blockchain projects.

In fact, it's no exaggeration to say that 100% secure randomness is impossible on the blockchain.

However, "almost secure" randomness could be usefull in most cases. This project's goal is having "almost secure" randomness on the blockchain.

## How It Works

Some nice diagrams and explanations here...

## Integration

Short hardhat example here...

Example Client Contract

```solidity
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

    // first step, creating seed, costs ether
    function generate() external payable {
        require(msg.value == 1 ether, "invalid payment");
        (, seeds[msg.sender]) = rng.getRandom();
    }

    // second step, proof should be generated on frontend side
    function use(uint256 _proof) external {
        require(_verify(_proof), "invalid proof");
        uint256 _randomness = _proof;
        uint256 _random;
        (_randomness, _random) = rng.getRandom(_proof, seeds[msg.sender]);
        console.log("here is your random number:", _random);
        (_randomness, _random) = rng.getRandomRange(0, 100, seeds[msg.sender]);
        console.log("here is another one between 0 and 100:", _random);
        currentRandom = uint8(_random);
    }
}


```

Deployment

```typescript
await ethers.getContractFactory("ExampleClient", {
  libraries: {
    Randomness: randomnessFujiAddress,
  },
});
```

### Contract Addresses

- Avalanche: soon
- Binance Smart Chain: soon
- Polygon: soon
- Avalanche Fuji C-Chain: [0xf4FF6bd06181f7893BFb5dD49aBe9566ae37C736](https://testnet.snowtrace.io/address/0x5DC92438078bA83af1d19ccD94129d10227204FC)
- Binance Smart Chain Testnet: [0x177ABa2ADb7570c70ca3E2760cd89E1823c29450](https://testnet.bscscan.com/address/0xf4FF6bd06181f7893BFb5dD49aBe9566ae37C736)
- Polygon Mumbai Testnet: [0x177ABa2ADb7570c70ca3E2760cd89E1823c29450](https://testnet.snowtrace.io/address/0x5DC92438078bA83af1d19ccD94129d10227204FC)

### Projects Using Randomness

- [WhitelistRaffle.avax.sh](https://whitelistraffle.avax.sh)

ps: you can create a pull request to add your project

## Credits

The theoretical and practical background of this project is based on the following article by **Justin Silver**

- [Provable Randomness with VDF by Justin Silver](https://www.justinsilver.com/technology/cryptocurrency/provable-randomness-with-vdf/)

## Disclaimer

At the time of writing, there is no known successfull attack to this algorithm. But as mentioned before, blockchain is a deterministic environment. Please use this source for non-critical operations with your own risk.
