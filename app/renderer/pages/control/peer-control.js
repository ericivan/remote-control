const EventEmitter = require('events');

const {desktopCapturer, ipcRenderer} = require('electron');
const peer = new EventEmitter();


// async function getScreenStream() {
//     const sources = await desktopCapturer.getSources({
//         types: ['screen']
//     })
//
//     navigator.getUserMedia({
//         audio: false,
//         video: {
//             mandatory: {
//                 chromeMediaSource: 'desktop',
//                 chromeMediaSourceId: sources[0].id,
//                 maxWidth: window.screen.width,
//                 maxHeight: window.screen.height
//             }
//         },
//
//     }, (stream) => {
//         peer.emit('add-stream', stream)
//     }, error => {
//
//         console.log(error)
//     });
// }
//
// getScreenStream();

const pc = new window.RTCPeerConnection({});

/*监听获取 candidate*/
pc.onicecandidate = function (e) {

    console.log('candidate', JSON.stringify(e.candidate));
};

let candidates = [];
async function addIceCandidate(candidate) {
    if (candidate) {
        candidates.push(candidate);
    }
    if (pc.remoteDescription && pc.remoteDescription.type) {
        for (let i = 0; i < candidates.length; i++) {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
        }

        candidates = [];
    }
}

async function createOffer() {
    const offer = await pc.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: true
    })

    await pc.setLocalDescription(offer);

    console.log(`pc offer`, JSON.stringify(offer));

    return pc.localDescription;
}

async function setRemote(answer) {
    await pc.setRemoteDescription(answer);
}


createOffer();

window.setRem1ote = setRemote;
window.addIceCandidate = addIceCandidate;


pc.onaddstream = function (e) {
    peer.emit('add-stream', e.stream);
};

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
