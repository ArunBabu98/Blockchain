// cchain experimental blockchain

const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

/* Block - timestamp, lasthash, data, hash */

class Block {
  constructor({ timestamp, lasthash, data, hash }) {
    this.timestamp = timestamp;
    this.lasthash = lasthash;
    this.data = data;
    this.hash = hash;
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, blockData }) {
    const timestamp = Date.now();
    const lasthash = lastBlock.hash;
    const data = blockData;
    const newBlock = new this({
      timestamp,
      lasthash,
      data,
      hash: cryptoHash(timestamp, lasthash, data),
    });
    return newBlock;
  }
}

module.exports = Block;
