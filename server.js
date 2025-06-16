const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/submit', (req, res) => {
  const data = req.body;
  const log = `${new Date().toISOString()} - Participant: ${data.participantId}, Trial: ${data.trial}, Speed: ${data.playbackSpeed}, Time: ${data.videoTime}\n`;

  fs.appendFile('speed-data.txt', log, (err) => {
    if (err) {
      console.error('Error saving data:', err);
      return res.status(500).send('Failed to save data');
    }
    console.log('Saved:', log);
    res.sendStatus(200);
  });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
