const {BrowserWindow} = require('electron');

// const isDev = require('electron-is-dev');

let isDev = false;
const path = require('path');

let win;
let willQuitApp = false;

function create() {
    win = new BrowserWindow({
        width: 600,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        }
    })

    win.on('close', (e) => {

        if (willQuitApp) {
            win = null;
        }else{
            e.preventDefault();
            win.hide();
        }

    })

    if (isDev) {
        win.loadURL("http://localhost:3000");
    } else {
        win.loadFile(path.resolve(__dirname, "../../renderer/pages/main/index.html"))
    }

}

/*主进程推送*/
function send(channel, ...args) {

    win.webContents.send(channel, ...args);
}



function show() {
    win.show();
}


function close() {
    willQuitApp = true;
    win.close();
}

function showDev() {
    win.webContents.openDevTools();
}
module.exports = {
    create,
    send,
    show,
    close,
    showDev
}
