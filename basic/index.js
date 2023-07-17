// simple hash
const myHash = (data) => {
  return data + "*";
};

// Block
class Block {
  constructor(data, hash, lastHash) {
    this.data = data;
    this.hash = hash;
    this.lastHash = lastHash;
  }
}

class Blockchain {
  constructor() {
    const genesis = new Block("genisis-block", "gen-hash", "gen-lastHash");
    this.chain = [genesis];
  }

  addBlock(data) {
    const lastHash = this.chain[this.chain.length - 1];
    const hash = myHash(data);
    const block = new Block(data, hash, lastHash);
    this.chain.push(block);
  }
}

const fooblockchain = new Blockchain();

fooblockchain.addBlock("one");
fooblockchain.addBlock("two");
fooblockchain.addBlock("three");

console.log(fooblockchain);
