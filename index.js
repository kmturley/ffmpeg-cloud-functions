const ffmpeg = require('fluent-ffmpeg');
const ffmpeg_static = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

const VIDEO_FORMAT = 'mpeg';

/**
 * Convert videos added to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.encodeVideo = async (event, context) => {
  if (event.name.endsWith(VIDEO_FORMAT)) {
    console.log('Already converted', event.name);
    return null;
  }
  const fileOut = event.name.replace(/\.[^/.]+$/, '.') + VIDEO_FORMAT;
  const pathIn = path.join(os.tmpdir(), event.name);
  const pathOut = path.join(os.tmpdir(), fileOut);
  const bucket = storage.bucket(event.bucket);
  await bucket.file(event.name).download({ destination: pathIn });
  console.log('downloaded', pathIn);
  let command = ffmpeg(pathIn)
    .setFfmpegPath(ffmpeg_static.path)
    .format(VIDEO_FORMAT)
    .output(pathOut);

  await new Promise((resolve, reject) => {
    command.on('end', resolve).on('error', reject).run();
  });
  console.log('created', pathOut);
  await bucket.upload(pathOut, { destination: fileOut });
  fs.unlinkSync(pathIn);
  fs.unlinkSync(pathOut);
  return console.log('removed', pathOut);
};
