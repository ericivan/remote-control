const peer = require('./peer-control');


let video = document.getElementById("screen-video");

function play(stream) {
    video.srcObject = stream;

    video.onloadedmetadata = function () {
        video.play();
    };
}

peer.on('add-stream', (stream) => {
    console.log('emit add-stream event');
    play(stream);
})

window.onkeydown = function (e) {

    let data = {
        keyCode: e.keyCode,
        shift: e.shiftKey,
        meta: e.metaKey,
        control: e.ctrlKey,
        alt:e.altKey

    };
    peer.emit('robot','key',data)
};

window.onmouseup = function (e) {

    let data ={
        clientX: e.clientX,
        clientY: e.clientY,
        video:{
            width:video.getBoundingClientRect().width,
            height: video.getBoundingClientRect().height
            // width: video.videoWidth,
            // height:video.videoHeight
        },
        screen:{

        }
    }

    peer.emit('robot', 'mouse',data);
};
