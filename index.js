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

// if((!options.stats && !options.validate && process.argv.length > 3)||(options.stats && !options.validate && process.argv.length > 4)
// ||(!options.stats && options.validate && process.argv.lenght>4)||(options.stats && options.validate && process.argv.lenght>5)){
//    console.log("jnk")
//   return}

mdLinks.mdLinks(path,options).then(res=>{
  console.log(res)
}).catch(err=>{
  console.log(err.message)
});