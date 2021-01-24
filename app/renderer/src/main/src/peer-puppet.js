/*
*
* */


import {desktopCapturer} from 'electron';

const pc = new window.RTCPeerConnection();

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

    console.log(screenStream);
    pc.addStream(screenStream);

    await pc.setRemoteDescription(offer);

    await pc.setLocalDescription(await pc.createAnswer());

    console.log('answer', JSON.stringify(pc.localDescription));

    return pc.localDescription;

}

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

window.createAnswer = createAnswer;
window.addIceCandidate = addIceCandidate;
