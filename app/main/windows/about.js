const { BrowserWindow } = require('electron');

const path = require('path')

let win

function create() {
    win = new BrowserWindow({
        width:500,
        height:450,
        webPreferences:{
            nodeIntegration:true
        }
    })

    win.loadFile(path.resolve(__dirname, '../../renderer/pages/about/index.html'));
}

module.exports = {create}
