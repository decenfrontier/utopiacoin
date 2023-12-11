const sha256 = require('crypto-js/sha256')

class Block {
    constructor(data, previousHash='') {
        this.data = data
        this.previousHash = previousHash
        this.hash = this.computeHash()
    }

    computeHash() {
        return sha256(this.data + this.previousHash).toString()
    }
}

class Chain {
    constructor() {
        this.chain = [this.bigBang()]
    }

    bigBang() {
        const genesisBlock = new Block('Genesis Block', '')
        return genesisBlock
    }

    getlatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    appendBlock(newBlock) {
        newBlock.previousHash = this.getlatestBlock().hash
        newBlock.hash = this.computeHash()
        this.chain.push(newBlock)
    }
}

const utopia = new Chain()
console.log(utopia)

const block1 = new Block('hello')
utopia.appendBlock(block1)