/*
    importing modules needed for this file
    -csv parse is a third-part node module
    -fs is the file system of the node module built in packages (commonJS)
*/
const {parse} = require('csv-parse');
const fs = require('fs');

//array to hold the values read from the kepler_data
const habitablePlanets = [];

/*
    This function filters planets that are possible habitable planets based earth attributes found on the article:
    found at https://www.centauri-dreams.org/2015/01/30/a-review-of-the-best-habitable-planet-candidates/
    -Stellar insolation ['koi_insol']
    -Planetary raius ['koi_prad']
*/
function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

/*
    Open the file as a strem (event emitter)
    1. Pipe the information through the parser => readable.pipe(writable)
    2. push data received from the kepler data to our results array if the data is valid
    2. error handling for mispeling of the file path
    3. at the end os the file print the message
*/
fs.createReadStream('kepler-data.csv')
    .pipe(parse({
        comment: '#',
        columns: true
    }))
    .on('data', (data) => {
        if (isHabitablePlanet(data)) {
            habitablePlanets.push(data);
        }
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        console.log(habitablePlanets.map((planet) => {
            return planet['kepler_name'];
        }));
        console.log(`${habitablePlanets.length} habitable planets found!`);
    });

// Results can be compared to the website below for possible habitable planets:
// https://phl.upr.edu/projects/habitable-exoplanets-catalog