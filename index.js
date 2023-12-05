let fs = require("fs")
let path = require("path")

let isEnabled = false
let controller = undefined
let messagePorts = new Set()
let buttonId = 0

exports.loadPlugin = async function(gridController, persistedData) {
    controller = gridController
    isEnabled = true
    buttonId = 0;

    //Add an action button whenever the plugin gets loaded into the application
    let actionHtml = fs.readFileSync(path.resolve(__dirname, 'hotkey_action.html'), {encoding: "utf-8"})
        controller.sendMessageToRuntime({
            id: "add-action",
            info: {
                actionId: 0,
                short: "xhotkey",
                name: "Hotkey",
                rendering: "standard",
                category: "plugin",
                desc: `Hotkey Action`,
                blockTitle: "Hotkey action",
                defaultLua: "gks()",
                color: "#9C92A4",
                icon: `
                <svg width="100%" height="100%" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 0H16C16.5523 0 17 0.447715 17 1V16C17 16.5523 16.5523 17 16 17H1C0.447715 17 0 16.5523 0 16V1C0 0.447715 0.447715 0 1 0ZM14 1H3C2.44772 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H14C14.5523 14 15 13.5523 15 13V2C15 1.44772 14.5523 1 14 1Z" fill="black"/>
                    <path d="M4.5 12C4.22386 12 4 12.2239 4 12.5C4 12.7761 4.22386 13 4.5 13H12.5C12.7761 13 13 12.7761 13 12.5C13 12.2239 12.7761 12 12.5 12H4.5Z" fill="black"/>
                    <path d="M4.66667 10.318V8.49984H3L5.5 5.31802L8 8.49984H6.33333V10.318H4.66667Z" fill="black"/>
                </svg>
                `,
                blockIcon: `
                <svg width="100%" height="100%" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 0H16C16.5523 0 17 0.447715 17 1V16C17 16.5523 16.5523 17 16 17H1C0.447715 17 0 16.5523 0 16V1C0 0.447715 0.447715 0 1 0ZM14 1H3C2.44772 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H14C14.5523 14 15 13.5523 15 13V2C15 1.44772 14.5523 1 14 1Z" fill="black"/>
                    <path d="M4.5 12C4.22386 12 4 12.2239 4 12.5C4 12.7761 4.22386 13 4.5 13H12.5C12.7761 13 13 12.7761 13 12.5C13 12.2239 12.7761 12 12.5 12H4.5Z" fill="black"/>
                    <path d="M4.66667 10.318V8.49984H3L5.5 5.31802L8 8.49984H6.33333V10.318H4.66667Z" fill="black"/>
                </svg>
                `,
                selectable: true,
                movable: true,
                hideIcon: false,
                type: "single",
                toggleable: true,
                actionHtml
            },
        })
}

exports.unloadPlugin = async function() {
    messagePorts.forEach((port) => port.close())
    messagePorts.clear()
    controller.sendMessageToRuntime({
        id: "remove-action",
        actionId: 0,
    })
    controller = undefined
}
