'use strict'

const xml2js = require('xml2js');
let parser2js = new xml2js.Parser();

let subjectsArray = [];
let subjectsArrayResult = [];
let ebookResult = {};
let authorsResult = [];


const parser = function(element) {
  parser2js.parseString(element, (err, result) => {
    if(err) {
      console.log('\x1b[31m%s\x1b[0m',err);
    }
    let base = result["rdf:RDF"];

    if(base["pgterms:ebook"][0]["dcterms:subject"]){
      let valuesToConvert = [];

      for(var i = 1; i <= base["pgterms:ebook"][0]["dcterms:subject"][0]["rdf:Description"].length; i++) {
        valuesToConvert = base["pgterms:ebook"][0]["dcterms:subject"][0]["rdf:Description"][0]["rdf:value"][0].split(' --');
      }
      subjectsArrayResult = subjectsArray.concat(valuesToConvert.map((elem) => {
        return result = {
          ebookId: base["pgterms:ebook"][0]["$"]["rdf:about"].split("/")[1],
          subject: elem
        }
      }));
    }
    if(base["pgterms:ebook"][0]["dcterms:creator"] && base["pgterms:ebook"][0]["dcterms:creator"][0]["pgterms:agent"]) {
      let authors = {};
      for(var i = 1; i <= base["pgterms:ebook"][0]["dcterms:creator"].length; i++) {
        authors.ebookId = base["pgterms:ebook"][0]["$"]["rdf:about"].split("/")[1]           
        authors.author = base["pgterms:ebook"][0]["dcterms:creator"][0]["pgterms:agent"][0]["pgterms:name"][0];
      }
      authorsResult.push(authors);
    }
    
    ebookResult = {
      id:base["pgterms:ebook"][0]["$"]["rdf:about"].split("/")[1],
      title:base["pgterms:ebook"][0]["dcterms:title"] ? base["pgterms:ebook"][0]["dcterms:title"][0] : "",
      publisher: base["pgterms:ebook"][0]["dcterms:publisher"][0] || "",
      publication_date: base["pgterms:ebook"][0]["dcterms:issued"][0]["_"] || "",
      language: base["pgterms:ebook"][0]["dcterms:language"][0]["rdf:Description"] ? base["pgterms:ebook"][0]["dcterms:language"][0]["rdf:Description"][0]["rdf:value"][0]["_"] : base["pgterms:ebook"][0]["dcterms:language"][0]["_"],
      license: base["cc:Work"][0]["cc:license"][0]["$"]["rdf:resource"] || "",
      rights: base["pgterms:ebook"][0]["dcterms:rights"][0] || "",
    };
  });

  return [ebookResult, authorsResult, subjectsArrayResult];
}

module.exports = parser;