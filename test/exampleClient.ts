import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  BigNumber,
  constants,
  Contract,
  ContractFactory,
  Signer,
} from "ethers";

import { expect } from "chai";
import { ethers } from "hardhat";
import { ExampleClient } from "../typechain-types";

import sloth from "./slothVDF";

let contractUnderTestFactory: ContractFactory;
let contractUnderTest: ExampleClient;

const prime: bigint = BigInt(
  "36118670070795088065488585428721163376455498422707"
);
const iterations: bigint = BigInt("32000");

// test addresses
let owner: SignerWithAddress;
let addr1: SignerWithAddress;
let addr2: SignerWithAddress;
let addrs: SignerWithAddress[];

beforeEach(async function () {
  [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
});

describe("ExampleClient deployment", function () {
  beforeEach(async function () {
    // deploy randomness library contract
    const mockRandomnessFactory = await ethers.getContractFactory("Randomness");
    const randomnessLibrary = await mockRandomnessFactory.deploy();
    await randomnessLibrary.deployed();
    // deploy contract under test
    contractUnderTestFactory = await ethers.getContractFactory(
      "ExampleClient",
      {
        libraries: {
          Randomness: randomnessLibrary.address,
        },
      }
    );
    contractUnderTest = (await contractUnderTestFactory.deploy(
      prime,
      iterations
    )) as ExampleClient;
    await contractUnderTest.deployed();
  });
  it("Should be deployed", async function () {
    // arrange
    const actualPrime = BigInt((await contractUnderTest.prime()).toString());
    const actualIterations = BigInt(
      (await contractUnderTest.iterations()).toString()
    );
    // act
    // assert
    expect(actualPrime).to.equal(prime);
    expect(actualIterations).to.equal(iterations);
  });
});

describe("ExampleClient randomness method tests", function () {
  beforeEach(async function () {
    // deploy randomness library contract
    const mockRandomnessFactory = await ethers.getContractFactory("Randomness");
    const randomnessLibrary = await mockRandomnessFactory.deploy();
    await randomnessLibrary.deployed();
    // deploy contract under test
    contractUnderTestFactory = await ethers.getContractFactory(
      "ExampleClient",
      {
        libraries: {
          Randomness: randomnessLibrary.address,
        },
      }
    );
    contractUnderTest = (await contractUnderTestFactory.deploy(
      prime,
      iterations
    )) as ExampleClient;
    await contractUnderTest.deployed();
  });
  it("Should generate random numbers", async function () {
    // arrange
    const _prime = BigInt((await contractUnderTest.prime()).toString());
    const _iterations = BigInt(
      (await contractUnderTest.iterations()).toString()
    );
    // act
    await contractUnderTest.generate({
      value: ethers.utils.parseEther("1.0"),
    });
    const seed = BigInt(
      (await contractUnderTest.seeds(owner.address)).toString()
    );
    let start = Date.now();
    const proof = sloth.compute(seed, prime, iterations);
    console.log("compute time", Date.now() - start, "ms", "vdf proof", proof);
    await contractUnderTest.use(proof);
    // assert
    const actualRandom = await contractUnderTest.currentRandom();
    expect(actualRandom).greaterThanOrEqual(0);
    expect(actualRandom).lessThanOrEqual(100);
  });
});
