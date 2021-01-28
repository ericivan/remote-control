const {app} = require('electron');

const handleIPC = require('./ipc');

const {create: createMainWindow, show: showMainWindow, close: closeMainWindow,showDev} = require('./windows/main');


// const {create: createControlWindow} = require('./windows/control');

app.allowRendererProcessReuse = false

const getTheLock = app.requestSingleInstanceLock();

if (!getTheLock) {
    /*禁止多开*/
    app.quit();
} else {

    /*禁止多开*/
    app.on('second-instance', () => {
        showMainWindow();
    })
    app.on('ready', () => {
        createMainWindow();

        // createControlWindow();

        showDev()
        handleIPC();
        require('./trayAndMenu')
        require('./robot.js')()
    });

    app.on('before-quit', () => {
        closeMainWindow();
    })

    app.on('activate', () => {
        showMainWindow();
    })

}
