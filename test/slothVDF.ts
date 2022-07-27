const bexmod = (base: bigint, exponent: bigint, modulus: bigint) => {
  let result = 1n;
  for (; exponent > 0n; exponent >>= 1n) {
    if (exponent & 1n) {
      result = (result * base) % modulus;
    }
    base = (base * base) % modulus;
  }
  return result;
};

const sloth = {
  compute(seed: bigint, prime: bigint, iterations: bigint) {
    const exponent = (prime + 1n) >> 2n;
    let beacon = seed % prime;
    for (let i = 0n; i < iterations; ++i) {
      beacon = bexmod(beacon, exponent, prime);
    }
    return beacon;
  },
};

export default sloth;
