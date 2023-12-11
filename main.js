const BC = require('./blockchain.js');
const TX = require('./transaction.js');


function main() {
    const utopia = new BC.Chain()
    const t1 = new TX.Transaction('addr1', 'addr2', 1000)
    const t2 = new TX.Transaction('addr2', 'addr3', 500)
    utopia.addTxnIntoPool(t1)
    utopia.addTxnIntoPool(t2)
    utopia.mineTransactionPool('addr3')
    console.log(utopia)
    console.log(utopia.getlatestBlock().transactions)
}

main()