const EventEmitter = require('events');

const {desktopCapturer,ipcRenderer} = require('electron');
const peer = new EventEmitter();


async function getScreenStream() {
    const sources = await desktopCapturer.getSources({
        types: ['screen']
    })

    navigator.getUserMedia({
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: sources[0].id,
                maxWidth: window.screen.width,
                maxHeight: window.screen.height
            }
        },

    }, (stream) => {
        peer.emit('add-stream', stream)
    }, error => {

        console.log(error)
    });
}

getScreenStream();

peer.on('robot', (type, data) => {
    if (type === 'mouse') {
        data.screen = {
            width: window.screen.width,
            height: window.screen.height,
        }
    }

    ipcRenderer.send('robot', type, data);
})

module.exports = peer;
