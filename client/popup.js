function setupPopup() {
    const balanceDom = document.querySelector('.balance')

    const reloadBalanceButton = document.querySelector('.reload-balance')
    reloadBalanceButton.addEventListener('click', async () => {
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
            balanceDom.innerHTML = `${result}`
        }
        catch (error) {
            console.error(error)
        }

    })
}

setupPopup()
