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
        this.chain = [this.genesis()]
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
        newBlock.hash = newBlock.computeHash()
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
                console.log(`block${i-1}-block${i} was broken`)
                return false
            }
        }
        return true
    }
}
const utopia = new Chain()
console.log(utopia)

const block1 = new Block('A transfer to B $1000')
utopia.appendBlock(block1)
const block2 = new Block('B transfer to C $500')
utopia.appendBlock(block2)
console.log(utopia)
console.log("validate result1:", utopia.validateChain())
// falsify the chain
utopia.chain[1].data = 'B transfer to C $800'
console.log("validate result2:", utopia.validateChain())
