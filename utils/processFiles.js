'use strict';

const fs = require('fs').promises;

const { parentPort, workerData }  = require('worker_threads');
const { dataToProcess, i } = workerData;
const parser = require('./parser');
const Ebook = require("../database/models").ebook;
const Subject = require("../database/models").subject;
const Authors = require("../database/models").author;

let ebooks = [];
let authors, results;
let subjects = [];
let saveData = [];

(async function readFiles() {
  console.log('\x1b[35m%s\x1b[0m',`Parsing files thread ${i}`)
  let individualFile;
  try{
    for (const file of dataToProcess) {
      individualFile = await fs.readFile(file, 'utf-8');
      results = parser(individualFile);
      ebooks.push(results[0])
      authors = results[1]
      subjects = subjects.concat.apply(subjects, results[2])
    };
  } catch(err) {
    console.log(err)
  }

  if (subjects === undefined || ebooks === undefined || authors === undefined ) {
    console.log('\x1b[33m%s\x1b[0m','Undefined');
  } else {
    Ebook.bulkCreate(ebooks, {updateOnDuplicate: ['title', 'publisher', 'publication_date', 'language', 'license', 'rights']})
    .then(() => {
      saveData.push(Subject.bulkCreate(subjects, { updateOnDuplicate: ['subject']}))
      saveData.push(Authors.bulkCreate(authors, { updateOnDuplicate: ['author']}))
      return Promise.all(saveData)
    })
    .then(data => {
      console.log('\x1b[35m%s\x1b[0m',`Done parsing files thread ${i}`)
      parentPort.postMessage({status: 'Done'})
    })
    .catch(err => {
      console.log("err", err)
    });
  }
})();