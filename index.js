const express = require('express');
const bodyParser = require('body-parser');
const mqtt = require('./controllers/mqtt');
const dataModel = require('./models/data');
const mysq = require('./lib/mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mqtt.init();

mysql.connect();

app.post('/data', async (req, res) => {
  const { value } = req.body;
  const timestamp = new Date().toISOString();
  const data = { value, timestamp };

  await dataModel.insertData(data);

  mqtt.publish(data);

  res.sendStatus(200);
});

// start Express server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

