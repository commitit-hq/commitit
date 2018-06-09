const Eos = require('eosjs')
const config = require('../client/eosConfig')

setInterval(() => {
    console.info(`Executing routine on ${Date.now()}`)
}, 1000)
