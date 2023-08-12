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

- Avalanche Fuji Testnet: [0xf4ff6bd06181f7893bfb5dd49abe9566ae37c736](https://testnet.snowtrace.io/address/0xf4ff6bd06181f7893bfb5dd49abe9566ae37c736)
- Binance Smart Chain Testnet: [0x177aba2adb7570c70ca3e2760cd89e1823c29450](https://testnet.bscscan.com/address/0x177aba2adb7570c70ca3e2760cd89e1823c29450)
- Polygon Mumbai Testnet: [0x177aba2adb7570c70ca3e2760cd89e1823c29450](https://mumbai.polygonscan.com/address/0x177aba2adb7570c70ca3e2760cd89e1823c29450)
- Avalanche C-Chain: [0x177aba2adb7570c70ca3e2760cd89e1823c29450](https://snowtrace.io/address/0x177aba2adb7570c70ca3e2760cd89e1823c29450)
- Binance Smart Chain Mainnet: [0x177aba2adb7570c70ca3e2760cd89e1823c29450](https://bscscan.com/address/0x177aba2adb7570c70ca3e2760cd89e1823c29450)
- Polygon Mainnet: [0x177aba2adb7570c70ca3e2760cd89e1823c29450](https://polygonscan.com/address/0x177aba2adb7570c70ca3e2760cd89e1823c29450)

### Projects Using Randomness

- [Randora](https://randora.avax.sh)

ps: you can create a pull request to add your project

## Credits

The theoretical and practical background of this project is based on the following article by **Justin Silver**

- [Provable Randomness with VDF by Justin Silver](https://www.justinsilver.com/technology/cryptocurrency/provable-randomness-with-vdf/)

## Disclaimer

At the time of writing, there is no known successfull attack to this algorithm. But as mentioned before, blockchain is a deterministic environment. Please use this source for non-critical operations with your own risk.
