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

    const deley = (time) => new Promise((resolve => setTimeout(resolve, time)))

    async function handleAppreciation() {
        buttonState.state = 'liking'
        const eos = Eos(window.config)
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
