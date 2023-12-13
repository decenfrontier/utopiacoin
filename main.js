const BC = require('./blockchain.js');
const TX = require('./transaction.js');
const ecLib = require("elliptic")

const ec = new ecLib.ec("secp256k1")


function main() {
    const utopia = new BC.Chain()

    const keyPair1 = ec.genKeyPair()
    const pubKey1 = keyPair1.getPublic('hex')
    const keyPair2 = ec.genKeyPair()
    const pubKey2 = keyPair2.getPublic('hex')

    const t1 = new TX.Transaction(pubKey1, pubKey2, 1000)
    const t2 = new TX.Transaction(pubKey2, pubKey1, 500)
    t1.sign(keyPair1)
    t2.sign(keyPair2)
    console.log(t1.isValid())
    console.log(t2.isValid())
    
    utopia.addTxnIntoPool(t1)
    utopia.addTxnIntoPool(t2)
    utopia.mineTransactionPool('addr3')
    console.log(utopia)
    console.log(utopia.getlatestBlock().transactions)
}

main()