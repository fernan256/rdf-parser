var assert = require('assert');
const { Worker } = require('worker_threads');

const dataToProcess = [
  '/home/diego/Documentos/bibliu_coding_test/test/1/pg1.rdf',
  '/home/diego/Documentos/bibliu_coding_test/test/2/pg2.rdf',
  '/home/diego/Documentos/bibliu_coding_test/test/3/pg3.rdf',
  '/home/diego/Documentos/bibliu_coding_test/test/4/pg4.rdf',
  '/home/diego/Documentos/bibliu_coding_test/test/5/pg5.rdf',
  '/home/diego/Documentos/bibliu_coding_test/test/6/pg6.rdf',
  '/home/diego/Documentos/bibliu_coding_test/test/7/pg7.rdf',
  '/home/diego/Documentos/bibliu_coding_test/test/8/pg8.rdf',
  '/home/diego/Documentos/bibliu_coding_test/test/9/pg9.rdf'
];

describe('Process Files', function() {
  let database = null;

  before(function(done) {

  })
  it.skip('Should return an array of URL strings', function() {
    
  })
});