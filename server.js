const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/notify', async (req, res) => {
  const { taskName } = req.body;

  try {
    await axios.post('https://slack.com/api/chat.postMessage', {
      channel: process.env.channel_id,  
      text: `Task "${taskName}" is marked as done.`
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.bearer_token  
      }
    });

    res.status(200).send('Notification sent.');
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send('Failed to send notification.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
