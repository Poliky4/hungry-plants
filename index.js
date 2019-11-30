const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

const {
  singleMeasurement,
  singlePlant,
  manyMeasurements,
  manyPlants,
} = require('./functions');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => res.status(200).json(manyPlants(10)));

app.get('/:id', (req, res) => res.status(200).json(singlePlant(req.params.id)));

app.get('/:id/measurements/latest', (req, res) => res.status(200).json(singleMeasurement(req.params.id)));

app.get('/:id/measurements', (req, res) => res.status(200).json(manyMeasurements(20)));

app.post('/postMessurement', async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.plant_id) {
      return res.status(400).json({
        msg: 'Error, plant_id was not defined',
      });
    }

    if (!req.body.data) {
      return res.status(400).json({
        msg: 'Error, data was not defined',
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

app.listen(3000, () => {
  console.log('app running on port 3000');
});
