const ffmpeg = require('fluent-ffmpeg');
const ffmpeg_static = require('ffmpeg-static');

const pathIn = './videos/example.avi';
const pathOut = './videos/example.mpeg';
const format = 'mpeg';

ffmpeg(pathIn)
  .setFfmpegPath(ffmpeg_static.path)
  .format(format)
  .on('end', function() {
    console.log('end', pathOut);
  })
  .on('error', function(err) {
    console.log('error', err.message);
  })
  .save(pathOut);
