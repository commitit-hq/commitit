function setStyleTag() {
    const styleTag = `
    <style>
        .appreciate-button {
            position: relative;
            text-align: right;
            height: 50px;
            padding: 10px 60px;
        }

    </style>
    `
    document.head.innerHTML += styleTag
}

function insertAppreciationButton(clickCallback) {
    const target = document.querySelector('.discussion-timeline-actions')
    const buttonDom = document.createElement('div')
    buttonDom.classList.add('appreciate-button')
    const buttonHTML = `
        <a class="btn btn-sm btn-with-count js-toggler-target">
            <span class="appreciate-button_text">
                Like
            </span>
        </a>
        <a class="like-count social-count js-social-count">
            0
        </a>
    `
    buttonDom.innerHTML = buttonHTML
    target.parentNode.insertBefore(buttonDom, target)
    buttonDom.addEventListener('click', clickCallback)
}

function main() {
    setStyleTag()

    const stateCore = {
        likeState: 'unknown',
        rows: [],
    }

    const eos = Eos(window.config)
    const pr_commiter = document.getElementsByClassName("pull-header-username")[0].innerText

    const state = new Proxy(stateCore, {
        set(obj, key, value) {
            if (key === 'likeState') {
                const textDom = document.querySelector('.appreciate-button_text')
                switch (value) {
                    case 'liking': {
                        textDom.innerText = 'Liking'
                        break
                    }
                    case 'liked': {
                        textDom.innerText = 'Liked'
                        const buttonDom = document.querySelector('.appreciate-button .btn')
                        buttonDom.classList.add('disabled')
                        const buttonWrapperDom = document.querySelector('.appreciate-button')
                        buttonWrapperDom.style.pointerEvents = 'none'
                        break
                    }
                }
            }
            if (key === 'rows') {
                const likesDom = document.querySelector('.like-count')
                const likes = value.filter(
                    row => window.location.pathname === row.pr_url
                ).length
                likesDom.innerText = likes
            }
            obj[key] = value
        }
    })

    const deley = (time) => new Promise((resolve => setTimeout(resolve, time)))

    async function queryAccountLikes () {
        // TODO: Can get table rows by command: `cleos get table commititlike commitittest data`
        // but cannot get from eosjs
        // ref: https://eosio.github.io/eos/group__eosiorpc.html#v1chaingettablerows
        let data = {more: true}
        while (data.more) {
            const currrentDataCount = state.rows.length
            data = await eos.getTableRows({
                code:'commititlike',  // should be contract account name
                scope:'commitittest', // should be own account name
                table:'data',
                table_key: 'like_id',
                json: true,
                lower_bound: currrentDataCount,
                upper_bound: currrentDataCount + 10,
            })
            state.rows = [
                ...state.rows,
                ...data.rows,
            ]
        }
        // console.log('//----- likes table -----')
        console.log(data)
        if (data.rows.some(row =>
            window.location.pathname === row.pr_url && row.pr_commiter === pr_commiter
        )) {
            state.likeState = 'liked'
        }
        else {
            state.likeState = 'not-liked'
        }
        // TODO save data and check if user has already Like the PR
    }
    queryAccountLikes()

    async function handleAppreciation() {
        state.likeState = 'liking'
        const pr_url = window.location.pathname
        try {
            const result = await eos.transaction({
                actions: [
                    {
                        account: 'commititlike',
                        name: 'createlike',
                        authorization: [{
                            actor: 'commitittest',
                            permission: 'active'
                        }],
                        data: {
                            voter: 'commitittest',
                            pr_commiter,
                            pr_url,
                        }
                    }
                ]
            })
            await deley(500)
            state.likeState = 'liked'
            const likesDom = document.querySelector('.like-count')
            likesDom.innerText = parseInt(likesDom.innerText, 10) + 1
            console.info(result)
        }
        catch (error) {
            console.error(error)
        }
    }

    insertAppreciationButton(handleAppreciation)
}

main()
