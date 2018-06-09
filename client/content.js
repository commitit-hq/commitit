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
            Nice PR!
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
    const config = {
        chainId: 'cec278a9dced800d9a695adc1e265ed11efa0ad8a70cdaac1eb65718bbe2434f',
        keyProvider: [], // WIF string or array of keys..
        httpEndpoint: 'http://203.195.171.163:8888',
        mockTransactions: () => 'pass', // or 'fail'
        transactionHeaders: (expireInSeconds, callback) => {
            callback(null/*error*/, headers)
        },
        expireInSeconds: 60,
        broadcast: true,
        debug: false, // API and transactions
        sign: true
    }

    async function handleAppreciation() {
        const eos = Eos(config)
        const firstblock = await eos.getBlock(664615)
        alert(JSON.stringify(firstblock, null, 4))
    }

    insertAppreciationButton(handleAppreciation)
}

main()
