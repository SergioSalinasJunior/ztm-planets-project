/*
    importing modules needed for this file
    -csv parse is a third-part node module
    -fs is the file system of the node module built in packages (commonJS)
*/
const parse = require('csv-parse');
const fs = require('fs');

//array to hold the values read from the kepler_data
const results = [];

/*
    Open the file as a strem (event emitter)
    1. push data received from the kepler data to our results array
    2. error handling for mispeling of the file path
    3. at the end os the file print the results data and "done" message
*/
fs.createReadStream('kepler_data');
    .on('data', (data) => {
        results.push(data);
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        console.log(results);
        console.log('done');
    });