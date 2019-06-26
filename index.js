const mdLinks = require('md-links.js');


// md.mdLinks(path,options).then(result=>{
//     console.log(result)
//   });



//process.argv --options blablalbalba 

///////////////////////
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

mdLinks(path,options).then(result=>{
  console.log(result)
});