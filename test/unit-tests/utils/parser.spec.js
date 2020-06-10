var assert = require('assert');
const parser = require('../../../utils/parser');
const fs = require('fs')

const exampleResult = [
  {
    id: '12551',
    title: 'The Mirror of Literature, Amusement, and Instruction. Volume 19, No. 541, April 7, 1832',
    publisher: 'Project Gutenberg',
    publication_date: '2004-06-01',
    language: 'en',
    license: 'https://creativecommons.org/publicdomain/zero/1.0/',
    rights: 'Public domain in the USA.'
  },
  [ { ebookId: '12551', author: 'Various' } ],
  [
    { ebookId: '12551', subject: 'Popular literature' },
    { ebookId: '12551', subject: ' Great Britain' },
    { ebookId: '12551', subject: ' Periodicals' }
  ]
];

describe('Parser', function() {
  it('Should return an array with the corresponding values', function() {
    let result;
    fs.readFile(__dirname + '/file.txt', function(f, data) {
      result = parser(data);
      assert.deepEqual(result, exampleResult)
    });
  })
})