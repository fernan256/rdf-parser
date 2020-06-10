'use strict';

const fs = require('fs').promises;

let result = [];

async function getPaths(path) {
  console.log('\x1b[35m%s\x1b[0m',"Getting paths...")
  let names;
  try {
    names = await fs.readdir(path);
    names.sort(function(a,b) {return a-b});
    names.forEach(ele => {
      result.push(path + ele + '/pg' + ele + '.rdf');
    })
    console.log('\x1b[35m%s\x1b[0m',"Done getting paths...")
    return result;
  } catch (err) {
    console.log(err);
  }
}
  
module.exports.getPaths = getPaths;