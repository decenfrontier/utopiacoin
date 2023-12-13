const sha256 = require('crypto-js/sha256')
const TX = require('./transaction')

class Block {
    constructor(transactions, previousHash = '') {
        this.transactions = transactions
        this.previousHash = previousHash
        this.hash = this.computeHash()
        this.timestamp = Date.now()
        this.nonce = 1
    }

    computeHash() {
        return sha256(JSON.stringify(this.transactions) + this.previousHash + this.nonce + this.timestamp).toString()
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
        this.difficulty = 4
        this.transactionPool = []
        this.minerReward = 50
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

    mineTransactionPool(minerAddress) {
        // Pack the miner rewards into the trading pool first
        var rewardTxn = new TX.Transaction('', minerAddress, this.minerReward);
        this.transactionPool.push(rewardTxn);
        // mine
        const newblock = new Block(this.transactionPool, this.getlatestBlock().hash);
        newblock.mine(this.difficulty);
        // append to chain
        this.chain.push(newblock)
        this.transactionPool = []
    }

    addTxnIntoPool(txn) {
        if (!txn.isValid()) {
            throw Error('Invalid transaction')
        }
        console.log(`Txn ${txn.from} -> ${txn.to}:${txn.amount} added into pool`)
        this.transactionPool.push(txn)
    }
}

module.exports = {
    Block: Block,
    Chain: Chain
}