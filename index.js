const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
// const moment = require('moment');

const {
  singleMeasurement,
  manyMeasurements,
  // manyPlants,
} = require('./functions');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
  const plants = await JSON.parse(fs.readFileSync('./db/plants.json').toString());
  return res.status(200).json(plants);
});

app.get('/:id', async (req, res) => {
  const { id } = req.params;

  const plants = await JSON.parse(fs.readFileSync('./db/plants.json').toString());
  const plant = plants.find(item => item.id === id);

  if (!plant) {
    console.log(404);
    return res.status(404).json({ message: 'Not found' });
  }

  const measurements = await JSON.parse(fs.readFileSync(`./db/measurements/${id}.json`));

  const filteredMeasurements = measurements.reverse().slice(0, 30);

  console.log(200);
  return res.status(200).json({
    ...plant,
    measurements: filteredMeasurements,
  });
});

app.get('/:id/measurements/latest', (req, res) => res.status(200).json(singleMeasurement(req.params.id)));

app.get('/:id/measurements', (req, res) => res.status(200).json(manyMeasurements(20)));

app.post('/postMessurement', async (req, res) => {
  console.log(req.body);

  const {
    body: {
      plant_id: plantId,
      data: measurement,
    },
  } = req;

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
    const filename = `./db/measurements/${plantId}.json`;

    const data = {
      timestamp: new Date().toISOString(),
      measurement,
    };

    // if file exists
    if (await !fs.existsSync(filename)) {
      await fs.writeFileSync(filename, JSON.stringify([], null, 2));
    }

    const measurementDb = await JSON.parse(fs.readFileSync(filename).toString());
    measurementDb.push(data);

    await fs.writeFileSync(filename, JSON.stringify(measurementDb, null, 2));
    // DO something with req.body
    return res.status(200).json(measurementDb);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Error' });
  }
});

app.listen(PORT, () => {
  console.log('app running on port', PORT);
});
