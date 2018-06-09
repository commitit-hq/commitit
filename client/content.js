function setStyleTag() {
    const styleTag = `
    <style>
        .appreciate-button-container {
            text-align: right;
        }
    
        .appreciate-button {
            display: inline-block;
            font-size: 36px;
            cursor: pointer;
            padding: 0.2em 0.5em;
            color: orange;
            font-weight: bold;
            user-select: none;
        }
        
        .appreciate-button:hover {
            background: #FF0;
        }
        
        .appreciate-button:active {
            background: #FD0;
        }
    </style>
    `
    document.head.innerHTML += styleTag
}

function insertAppreciationButton(clickCallback) {
    const target = document.querySelector('.discussion-timeline-actions')
    const buttonHTML = `
    <div class="appreciate-button-container">
        <a class="appreciate-button" role="button">
        <span class="appreciate-button_text">
            Nice PR!
        </span>
        </a>
    </div>
    `
    const buttonDom = document.createElement('div')
    buttonDom.innerHTML = buttonHTML
    target.parentNode.insertBefore(buttonDom, target)
    buttonDom.addEventListener('click', clickCallback)
}

function main() {
    setStyleTag()

    const buttonStateCore = {
        state: 'not-liked'
    }

    const buttonState = new Proxy(buttonStateCore, {
        set(obj, key, value) {
            if (key === 'state') {
                const textDom = document.querySelector('.appreciate-button_text')
                console.info(value)
                switch (value) {
                    case 'liking': {
                        textDom.innerHTML = 'liking'
                        break
                    }
                    case 'liked': {
                        textDom.innerText = 'liked'
                        break
                    }
                }
            }
            obj[key] = value
        }
    })

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

    const deley = (time) => new Promise((resolve => setTimeout(resolve, time)))

    async function handleAppreciation() {
        buttonState.state = 'liking'
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
            await deley(500)
            buttonState.state = 'liked'
            console.info(result)
        }
        catch (error) {
            console.error(error)
        }
    }

    insertAppreciationButton(handleAppreciation)
}

main()
