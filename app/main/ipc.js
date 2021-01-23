const {ipcMain} = require('electron');

const {send: sendMainWindow} = require('./windows/main');

const {create: createControlWindow} = require('./windows/control');

module.exports = function () {

    /*主进程响应*/
    ipcMain.handle('login', async () => {

        /*mock*/

        return Math.floor(Math.random() * (999999 - 100000)) + 100000
    });

    ipcMain.on('control', async (e, remoteCode) => {

        /*服务器交互*/

        sendMainWindow('control-state-change', remoteCode, 1);

        createControlWindow();
    })
};
