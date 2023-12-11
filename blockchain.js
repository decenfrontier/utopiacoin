const sha256 = require('crypto-js/sha256')

class Block {
    constructor(data, previousHash = '') {
        this.data = data
        this.previousHash = previousHash
        this.hash = this.computeHash()
        this.nonce = 1
    }

    computeHash() {
        return sha256(this.data + this.previousHash + this.nonce).toString()
    }

    mine(difficulty) {
        while (!this.hash.startsWith("0".repeat(difficulty))) {
            this.nonce++
            this.hash = this.computeHash()
        }
        console.log(`Block mined: ${this.hash}, Nonce: ${this.nonce}`)
    }
}

class Chain {
    constructor() {
        this.chain = [this.genesis()]
        this.difficulty = 5
    }

    genesis() {
        const block0 = new Block('Genesis Block', '')
        return block0
    }

    getlatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    appendBlock(newBlock) {
        newBlock.previousHash = this.getlatestBlock().hash
        newBlock.mine(this.difficulty)
        this.chain.push(newBlock)
    }

    validateChain() {
        if (this.chain.length === 1) {
            return this.chain[0].hash === this.chain[0].computeHash()
        }
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            if (currentBlock.hash !== currentBlock.computeHash()) {
                console.log(`block${i} validate error`)
                return false
            }
            const previousBlock = this.chain[i - 1]
            if (currentBlock.previousHash !== previousBlock.hash) {
                console.log(`block${i - 1}-block${i} was broken`)
                return false
            }
        }
        return true
    }
}

module.exports = {
    Block: Block,
    Chain: Chain
}