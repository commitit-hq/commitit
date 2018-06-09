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

function main() {
    setStyleTag()
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
}

main()
