const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => res.json({ msg: 'Hello World!' }));

app.post('/postMessurement', async (req, res) => {
  try {
    if (!req.body.units) {
      return res.status(400).json({
        msg: 'Error, units was not defined',
      });
    }

    if (!req.body.volt) {
      return res.status(400).json({
        msg: 'Error, volt was not defined',
      });
    }
    const filename = `./logs/${moment().format('YYYY-MM-DD')}.log.json`;

    const data = {
      timestamp: new Date().toISOString(),
      ...req.body,
    };

    // if file exists
    if (await !fs.existsSync(filename)) {
      await fs.writeFileSync(filename, JSON.stringify({ logs: [] }, null, 2));
    }

    const log = await JSON.parse(fs.readFileSync(filename).toString());
    log.logs.push(data);

    await fs.writeFileSync(filename, JSON.stringify(log, null, 2));
    // DO somthing with req.body
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Error' });
  }
});

// messurements
app.get('/:id/latest', (req, res) => res.status(200).json({
  id: 'random-id',
  plant_id: req.params.id,
  timestamp: new Date().toISOString(),
  volt: 22,
  units: 500,
  humidity: 0.87,
}));

app.get('/:id/all', (req, res) => res.status(200).json([
  {
    id: 'random-id',
    plant_id: req.params.id,
    timestamp: new Date().toISOString(),
    volt: 22,
    units: 500,
    humidity: 0.87,
  },
  {
    id: 'random-id',
    plant_id: req.params.id,
    timestamp: new Date().toISOString(),
    volt: 22,
    units: 500,
    humidity: 0.87,
  },
  {
    id: 'random-id',
    plant_id: req.params.id,
    timestamp: new Date().toISOString(),
    volt: 22,
    units: 500,
    humidity: 0.87,
  },
  {
    id: 'random-id',
    plant_id: req.params.id,
    timestamp: new Date().toISOString(),
    volt: 22,
    units: 500,
    humidity: 0.87,
  },
  {
    id: 'random-id',
    plant_id: req.params.id,
    timestamp: new Date().toISOString(),
    volt: 22,
    units: 500,
    humidity: 0.87,
  },
]));

app.listen(3000, () => {
  console.log('app running on port 3000');
});
