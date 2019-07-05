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
  if(options.validate && options.stats){
    return console.log("Total Links: "+ res.total+"\n"+"Ok Links: "+res.ok+"\n"+"Broken Links: "+res.broken)
  }
  if(options.validate){
    if(res.length === 0){
      return console.log("No se encontraron links")
    }
    let validateLinks = res.map(x=>x.file+"  "+x.href+"  "+x.text.substr(0,40)+"  "+x.status)
    return console.log(validateLinks.join("\n "))
  }
  if(options.stats){
    return console.log("Total Links: "+ res.total+"\n"+"Unique Links: "+res.unique)
  }else{
    if(res.length === 0){
      return console.log("No se encontraron links")
    }
    const resLinks = res.map(x=>x.file+"  "+x.href+"  "+x.text.substr(0,40))
    return console.log(resLinks.join("\n "))
  }
}).catch(err=>{
  console.log(err.message)
});