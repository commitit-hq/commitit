function setStyleTag() {
    const styleTag = `
    <style>
        .appreciate-button-container {
            text-align: right;
        }

        .appreciate-button {
            margin: 10px 0;
        }
    </style>
    `
    document.head.innerHTML += styleTag
}

function insertAppreciationButton(clickCallback) {
    const target = document.querySelector('.discussion-timeline-actions')
    const wrapperDom = document.createElement('div')
    wrapperDom.classList.add('appreciate-button-container')
    const buttonHTML = `
        <a class="appreciate-button btn btn-primary" role="button">
            <span class="appreciate-button_text">
                Nice PR!
            </span>
        </a>
    `
    wrapperDom.innerHTML = buttonHTML
    target.parentNode.insertBefore(wrapperDom, target)
    wrapperDom.addEventListener('click', clickCallback)
}

function main() {
    setStyleTag()

    const buttonStateCore = {
        state: 'not-liked',
    }

    const buttonState = new Proxy(buttonStateCore, {
        set(obj, key, value) {
            if (key === 'state') {
                const textDom = document.querySelector('.appreciate-button_text')
                console.info(value)
                switch (value) {
                    case 'liking': {
                        textDom.innerText = 'Liking'
                        break
                    }
                    case 'liked': {
                        textDom.innerText = 'Liked'
                        const buttonDom = document.querySelector('.appreciate-button')
                        buttonDom.classList.add('disabled')
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
                        account: 'commitit.lk1',
                        name: 'like',
                        authorization: [{
                            actor: 'commitittest',
                            permission: 'active'
                        }],
                        data: {
                            voter: 'commitittest',
                            pr_commiter: 'noprom',
                            pr_url: "EOSIO/eos/pull/3986",
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
