const {ipcMain} = require('electron');

const {send: sendMainWindow} = require('./windows/main');

const {create: createControlWindow, send: sendControlWindow} = require('./windows/control');

const signal = require('./signal');


module.exports = function () {

    /*主进程响应*/
    ipcMain.handle('login', async () => {

        let {code} = await signal.invoke('login', null, 'logined');

        return code;
    });

    ipcMain.on('control', async (e, remote) => {
        console.log('ipMain controll', remote);
        signal.send('control', {remote})
    })

    signal.on('controlled', (data) => {
        console.log('signal on controlled')
        createControlWindow();

        sendMainWindow('control-state-change', data.remote, 1);
    })

    signal.on('be-controlled', (data) => {
        console.log('signal be-controlled')
        sendMainWindow('control-state-change', data.remote, 2);

    })

    ipcMain.on('forward', (e, event, data) => {
        signal.send('forward', {event, data})
    })



    signal.on('offer', (data) => {
        sendMainWindow('offer', data);
    })

    signal.on('answer', (data) => {
        sendControlWindow('answer', data);
    })


    /*傀儡段发给控制端*/
    signal.on('puppet-candidate', data => {
        sendControlWindow('candidate', data);
    })

    signal.on('control-candidate', (data) => {
        sendMainWindow('candidate', data);
    })
};
