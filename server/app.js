const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { mixTracks } = require('./services/audioProcessor');

const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });

app.post('/api/mix', upload.array('tracks', 2), async (req, res) => {
  const [file1, file2] = req.files;
  try {
    const output = await mixTracks(file1.path, file2.path);
    res.download(output);
  } catch (error) {
    res.status(500).json({ error: 'Mixing failed' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
