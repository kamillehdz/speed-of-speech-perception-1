const express = require('express');
const fs = require('fs');
const emailjs = require('@emailjs/nodejs');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/submit', async (req, res) => {
  const data = req.body;
  const log = `${new Date().toISOString()} - Participant: ${data.participantId}, Trial: ${data.trial}, Speed: ${data.playbackSpeed}, Time: ${data.videoTime}\n`;

  // Save to file
  fs.appendFile('speed-data.txt', log, (err) => {
    if (err) {
      console.error('Error saving data:', err);
    } else {
      console.log('Saved to file:', log);
    }
  });

  // Send email using EmailJS
  try {
    const response = await emailjs.send(
      'service_speed_perception',
      'template_60hcc4f',
      {
        participant_id: data.participantId,
        trial_number: data.trial,
        playback_speed: data.playbackSpeed,
        video_time: data.videoTime,
        message_log: log
      },
      {
        publicKey: 'GLwC-Me-PN-n4W2OL',
        privateKey: 'f7ekh226Lqs-D8DcctJ7R'
      }
    );

    console.log('Email sent successfully:', response);
    res.status(200).send('Data and email sent');
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).send('Failed to send email');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
