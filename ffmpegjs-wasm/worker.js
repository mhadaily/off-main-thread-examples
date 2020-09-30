import { expose } from 'comlink';
import { createFFmpeg } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({
  log: true,
});

expose(ffmpeg);
