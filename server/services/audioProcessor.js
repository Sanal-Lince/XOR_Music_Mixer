const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

async function mixTracks(track1Path, track2Path) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(__dirname, `../../output/mix-${uuidv4()}.mp3`);
    ffmpeg()
      .input(track1Path)
      .input(track2Path)
      .complexFilter('[0:a][1:a]amix=inputs=2:duration=longest')
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .run();
  });
}

module.exports = { mixTracks };
