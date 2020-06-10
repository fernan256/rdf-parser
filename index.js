'use strict';

require('dotenv').config();

const { Worker } = require('worker_threads');
const logUpdate = require('log-update');
const getDirs = require('./utils/getDirectories').getPaths(process.env.PATH_TO_FILES_ORI);

const db = require("./database/models");
db.sequelize.sync();

const threads = parseInt(process.env.NUMBER_OF_THREADS);
const files = [...Array(threads)].fill(0);

//This is to get only the results from processFiles
const processFile = require.resolve("./utils/processFiles.js");

(function createWorkers() {
  getDirs
  .then(dir => {
    const numberOfFiles = dir.length;
    let shortArray = [];
    for(var i = 0; i < threads; i++) {
      shortArray.push(dir.splice(i, Math.floor(numberOfFiles / threads)))
    }

    for (let i = 0; i < threads; i++) {
      let dataToProcess = shortArray[i];
      const port = new Worker(require.resolve("./utils/processFiles.js"), {
        workerData: { dataToProcess, i }
      });
      port.on("message", (data) => handleMessage(data, i));
      port.on("error", (err) => console.log(err));
      port.on("exit", (code) => console.log(`Exit code: ${code}`));
    }
    
    function handleMessage(_, index) {
      files[index]++;
      logUpdate(files.map((status,i) =>`Thread ${i}: ${status}`));
    }
  })
  .catch(err => {
    console.log(err)
  })
})();