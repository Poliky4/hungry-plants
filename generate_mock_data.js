const fs = require("fs");

const dbPath = "./db";
const measurementPath = "./db/measurements";

const nbrOfPlants = 2;
const nbrOfMeasurements = 2;

(async () => {
  makeDir(dbPath);
  makeDir(measurementPath);

  const plants = [];

  for (let i = 0; i < nbrOfPlants; i++) {
    plants.push(makePlant(i, `Plantan ${i}`, nbrOfMeasurements));
  }

  writeFile(`${dbPath}/plants`, plants);
})();

function makePlant(id, name, nbrOfMeasurements) {
  const plant = {
    id: id.toString(),
    name,
  };

  const measurements = [];

  for (let i = 0; i < nbrOfMeasurements; i++) {
    measurements.push({
      timestamp: new Date(new Date().getTime() + 60000 * (i + 1)).toISOString(),
      data: Math.floor(Math.random() * 1024),
    });
  }

  writeFile(`${measurementPath}/${plant.id}`, measurements);

  return plant;
}

function writeFile(name, data) {
  fs.writeFileSync(`${name}.json`, JSON.stringify(data, null, 2));
}

function makeDir(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
    // fs.mkdir(path, () => {});
  }
}
