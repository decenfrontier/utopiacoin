const sha256 = require("crypto-js/sha256")
const ecLib = require("elliptic")

const ec = new ecLib.ec("secp256k1")

class Transaction {
    constructor(from, to, amount) {
        this.from = from
        this.to = to
        this.amount = amount
        this.signature = ""
    }

    // 计算这笔交易的哈希
    computeHash() {
        return sha256(this.from + this.to + this.amount).toString()
    }
    // 用from的私钥对交易哈希进行签名
    sign(fromKeyPair) {
        this.signature = fromKeyPair.sign(this.computeHash(), "base64").toDER("hex")
    }
    // 把交易的签名用from公钥进行解密，然后将解密后的结果与给定的哈希值进行比较
    isValid() {
        if (this.from === "") {
            return true
        }
        const fromKeyPair = ec.keyFromPublic(this.from, "hex") // 这里为了简单, 认定地址就是公钥
        return fromKeyPair.verify(this.computeHash(), this.signature)
    }
}

module.exports = {
    Transaction: Transaction,
}
