const config = {
    chainId: 'cec278a9dced800d9a695adc1e265ed11efa0ad8a70cdaac1eb65718bbe2434f',
    contractSender: "commitittest",
    keyProvider: [
        `5JHeN2n3ai7awp9tWDwe12rV5ia9oLfZkxMs9oLz18FND7EvcjT`
    ], // WIF string or array of keys..
    httpEndpoint: 'http://203.195.171.163:8888',
    // httpEndpoint: 'http://127.0.0.1:8888',
    // mockTransactions: () => 'pass', // or 'fail'
    expireInSeconds: 60,
    broadcast: true,
    debug: false, // API and transactions
    sign: true
}

if (typeof window !== 'undefined') {
    window.config = config
}

try {
    module.exports = config
}
catch (error) {}
