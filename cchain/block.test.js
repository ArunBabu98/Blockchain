// Testing for cchain blockss

const Block = require("./block");
const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

describe("Block", () => {
  const timestamp = "a-date";
  const lasthash = "foo-hash";
  const data = "bar-hash";
  const hash = ["blockchain", "data"];
  const block = new Block({
    timestamp,
    lasthash,
    data,
    hash,
  });

  it("has a block has a timestamp, lasthash, hash and data property", () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lasthash).toEqual(lasthash);
    expect(block.data).toEqual(data);
    expect(block.hash).toEqual(hash);
  });

  describe("genesis()", () => {
    const genesisBlock = Block.genesis();

    it("returns a Block instance", () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it("returns the genesis data", () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe("mineBlock()", () => {
    const lastBlock = Block.genesis();
    const blockData = "mined-block";
    const minedBlock = Block.mineBlock({ lastBlock, blockData });

    it("returns a Block instance", () => {
      expect(minedBlock instanceof Block).toBe(true);
    });

    it("sets the `lasthash` to be the `hash` of the lastBlock", () => {
      expect(minedBlock.lasthash).toEqual(lastBlock.hash);
    });

    it("sets the data", () => {
      expect(minedBlock.data).toEqual(blockData);
    });

    it("sets the timestamp", () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });

    it("creates a sha-256 hash based on the proper inputs", () => {
      expect(minedBlock.hash).not.toEqual(
        cryptoHash(minedBlock.timestamp, lastBlock.hash, data)
      );
    });
  });
});
