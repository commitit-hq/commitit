function setupPopup() {
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

    const balanceDom = document.querySelector('.balance')

    const reloadBalanceButton = document.querySelector('.reload-balance')
    reloadBalanceButton.addEventListener('click', async () => {
        const eos = Eos(config)
        try {
            const result = await eos.transaction({
                actions: [
                    {
                        account: 'commitittest',
                        name: 'transfer',
                        authorization: [{
                            actor: 'commitittest',
                            permission: 'active'
                        }],
                        data: {
                            from: 'commitittest',
                            to: 'andyandyandy',
                            quantity: '23482 ANDY',
                            memo: ''
                        }
                    }
                ]
            })
            balanceDom.innerHTML = `${result}`
        }
        catch (error) {
            console.error(error)
        }

    })
}

setupPopup()
