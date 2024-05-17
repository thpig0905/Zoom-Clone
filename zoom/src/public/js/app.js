const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");

let myStream;
let muted = false;
let cameraOff = false;

async function getMedia() {
    try {
        myStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        myFace.srcObject = myStream;
    } catch (e) {
        console.error(e);
    }
}

getMedia();

muteBtn.addEventListener("click", () => {
    myStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
    if (myStream.getAudioTracks()[0].enabled) {
        muteBtn.innerText = "Mute";
    } else {
        muteBtn.innerText = "Unmute";
    }
});

cameraBtn.addEventListener("click", () => {
    myStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
    if (myStream.getVideoTracks()[0].enabled) {
        cameraBtn.innerText = "Turn Camera Off";
    } else {
        cameraBtn.innerText = "Turn Camera On";
    }
});