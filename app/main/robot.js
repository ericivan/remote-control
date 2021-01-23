const {ipcMain} = require('electron');

const robot = require('robotjs');

const vkey = require('vkey');
function handleMouse(data) {
    /**
     * data {clientX ,clientY ,screen:{width,height},video:{width,height}}
     */
    const {clientX, clientY, screen, video} = data;
    let x = clientX * screen.width / video.height;
    let y = clientY * screen.width / video.height;

    // console.log(data,x,y);
    robot.moveMouse(x, y);

    robot.mouseClick();
}

function handleKey(data) {
    /**
     * data {keyCode,meta,alt,ctrl,shift}
     */

    let modifiers = [];

    if (data.meta) {
        modifiers.push('meta');
    }
    if (data.alt) {
        modifiers.push('alt');
    }
    if (data.control) {
        modifiers.push('ctrl');
    }
    if (data.meta) {
        modifiers.push('shift');
    }

    let key = vkey[data.keyCode].toLowerCase();

    if (key[0] !== "<") {
        robot.keyTap(key, modifiers);
    }

}

module.exports = function () {
    ipcMain.on('robot', (e, type, data) => {
        if (type === 'mouse') {
            handleMouse(data);
        } else if (type === 'key') {
            handleKey(data);
        }
    })
}
