#!/usr/bin/env node
const mdLinks = require('./md-links.js');

let path = process.argv[2]

let options = {
  stats: false,
  validate: false,
}

process.argv.forEach(element =>{
 if( element == "--stats"){
   options.stats = true
 }
if(element == "--validate"){
  options.validate = true
}
})

mdLinks.mdLinks(path,options).then(res=>{
  console.log(res)
}).catch(err=>{
  console.log(err.message)
});