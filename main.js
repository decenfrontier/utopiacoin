var BC = require('./blockchain.js');

function main() {
    const utopia = new BC.Chain()
    console.log(utopia)

    const block1 = new BC.Block('A transfer to B $1000')
    utopia.appendBlock(block1)
    const block2 = new BC.Block('B transfer to C $500')
    utopia.appendBlock(block2)
    console.log(utopia)
    console.log("validate result1:", utopia.validateChain())
    // falsify the chain
    // utopia.chain[1].data = 'B transfer to C $800'
    // console.log("validate result2:", utopia.validateChain())
}

main()