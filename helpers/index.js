/**
 * This was written on Dec 28 2022 as a prototype method for ingesting test cases written in Google sheets
 * as CSVs so they could be iterated over in Playwright.
 * @param {string} filename The filename to parse
 */
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const getData = async (filename) => {

  return await new Promise((resolve, reject) => {

    // Init the array to return in the resolved promise
    const records = [];

    // Evaluate the filepath
    const filepath = path.resolve(__dirname, filename);

    fs.createReadStream(filepath)
      .pipe(parse({
        columns: true
      }))
      .on('data', (record) => {
        // push the record to records[]
        records.push(record);

        /**
         * @note
         * we can also use on('readable', ()) here
         * but on('data') gives us a chance to transform data if needed
         */
      })
      .on('end', () => {
        // resolve the promise with records[]
        resolve(records);
      })
      .on('error', () => {
        reject('something went wrong');
      });

  });

};

module.exports = { getData };