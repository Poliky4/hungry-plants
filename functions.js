const uuidv4 = require('uuid/v4');

const singleMeasurement = id => ({
  id: uuidv4(),
  plant_id: id,
  timestamp: new Date().toISOString(),
  volt: 22,
  units: 500,
  humidity: Number(Math.random()).toFixed(2),
});

const singlePlant = (id = uuidv4()) => ({
  id,
  name: 'my plant',
  breed: 'chili',
  latest_measurement: singleMeasurement(id),
});


const manyPlants = (amount = 5) => {
  const array = [];
  for (let i = 0; i < amount; i += 1) {
    array.push(singlePlant());
  }
  return array;
};

const manyMeasurements = (amount = 5) => {
  const array = [];
  const uuid = uuidv4();
  for (let i = 0; i < amount; i += 1) {
    array.push(singleMeasurement(uuid));
  }
  return array;
};

module.exports = {
  singlePlant,
  singleMeasurement,
  manyPlants,
  manyMeasurements,
};
