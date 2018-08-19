const uuidv4 = require('uuid/v4');

const singleMeasurement = id => ({
  id: uuidv4(),
  plant_id: id,
  timestamp: new Date().toISOString(),
  volt: 22,
  units: 500,
  humidity: 0.87,
});

const singlePlant = (id = uuidv4()) => ({
  id,
  name: 'my plant',
  breed: 'chili',
  latest_measurement: singleMeasurement(id),
});


const manyPlants = (amount) => {
  const array = [];
  for (let i = 0; i < amount; i += 1) {
    array.push(singlePlant());
  }
  console.log(array);

  return array;
};

const manyMeasurements = (amount) => {
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
