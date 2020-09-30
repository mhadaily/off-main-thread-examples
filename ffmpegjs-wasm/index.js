import { createFFmpeg } from '@ffmpeg/ffmpeg';
import { wrap } from 'comlink';

const webcam = document.getElementById('webcam');
const recordBtn = document.getElementById('record');
const ffmpeg = createFFmpeg({
  log: true,
});

const startRecording = () => {
  const rec = new MediaRecorder(webcam.srcObject);
  const chunks = [];

  recordBtn.textContent = 'Stop Recording';
  recordBtn.onclick = () => {
    rec.stop();
    recordBtn.textContent = 'Start Recording';
    recordBtn.onclick = startRecording;
  };

  rec.ondataavailable = (e) => chunks.push(e.data);
  rec.onstop = async () => {
    transcode(new Uint8Array(await new Blob(chunks).arrayBuffer()));
  };
  rec.start();
};

(async () => {
  try {
    console.log('request for camera');
    webcam.srcObject = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    await webcam.play();
    recordBtn.disabled = false;
    recordBtn.onclick = startRecording;
  } catch (e) {
    console.error(e);
  }
})();

const transcode = async (webcamData) => {
  const message = document.getElementById('message');
  const name = 'record.webm';
  message.innerHTML = 'Loading ffmpeg-core.js';
  console.log(ffmpeg);
  await ffmpeg.load();
  message.innerHTML = 'Start transcoding';
  await ffmpeg.write(name, webcamData);
  await ffmpeg.transcode(name, 'output.mp4', '-threads 2');
  message.innerHTML = 'Complete transcoding';
  const data = ffmpeg.read('output.mp4');

  const video = document.getElementById('output-video');
  video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
};
