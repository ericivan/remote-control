/*
*
* */


import {desktopCapturer, ipcRenderer} from 'electron';

const pc = new window.RTCPeerConnection();

pc.ondatachannel = (e) => {

    e.channel.onmessage = e => {
        let {type, data} = JSON.parse(e.data)
        if (type === 'mouse') {
            data.screen = {
                width: window.screen.width,
                height: window.screen.height,
            }
        }
        ipcRenderer.send('robot', type, data);
    }
}

async function getStreenStream() {

    const sources = await desktopCapturer.getSources({
        types: ['screen']
    })

    return new Promise((resolve, reject) => {

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
            resolve(stream);
        }, error => {
            reject(error);
            console.log(error)
        });
    })
}


async function createAnswer(offer) {
    let screenStream = await getStreenStream();

    pc.addStream(screenStream);

    await pc.setRemoteDescription(offer);

    await pc.setLocalDescription(await pc.createAnswer());

    return pc.localDescription;

}

let candidates = [];

async function addIceCandidate(candidate) {
    if (candidate) {
        candidates.push(candidate);
    }
    if (pc.remoteDescription && pc.remoteDescription.type) {
        for (let i = 0; i < candidates.length; i++) {
            await pc.addIceCandidate(new RTCIceCandidate(JSON.parse(candidates[i])));
        }

        candidates = [];
    }
}

ipcRenderer.on('offer', async (e, offer) => {
    let answer = await createAnswer(offer);

    ipcRenderer.send('forward', 'answer', {
        type: answer.type,
        sdp: answer.sdp
    })
})

ipcRenderer.on('candidate', async (e, candidate) => {
    await addIceCandidate(candidate);
})

/*监听获取 candidate*/
pc.onicecandidate = function (e) {

    console.log('puppet-candidate');

    if (e.candidate) {

        ipcRenderer.send('forward', 'puppet-candidate', JSON.stringify(e.candidate));
    }
};



