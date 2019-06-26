const fs = require('fs');
const marked = require('marked');
const FileHound = require('filehound');
const fetch = require('node-fetch');

//leer archivos md de directorio
const readingDirect = (path =>{
const files = FileHound.create().paths(path).ext('md').find();
// files.then(console.log);
return files;
})


//obtener links de un archivo
const links = (path =>{
  return new Promise((resolve, reject) => {
    fs.readFile( path,'utf8', (err, data) => {
      if (err){
        throw err;
      } 
    let links = [];
    const renderer = new marked.Renderer();
    
    renderer.link = function(href,title,text){
      if(!href.startsWith("mailto:"))
        links.push({
          href:href,
          text:text,
          file:path})
      } 

      marked(data,{renderer:renderer}); 
      resolve(links)
      
    })
  })
})



// true si el archivo es .md
const isMd =  (text =>{
  if(text.slice(-3)== ".md"){
    return true;
  }
  return false;
})




// console.log(readingDirect('/home/laboratoriad128/Escritorio/SCL009-md-links/'))
// console.log(isMd("./prueba.md"))



// genera arreglo con informacion de todos los links de los archivos md del directorio
const handleDirectory = (files =>{
  return new Promise((resolve, reject)=>{
    let count = 0;
    let allLinks = []
      files.forEach(element => {
        links(element).then(singleLink =>{
          count++
          allLinks = allLinks.concat(singleLink)
          if(count == files.length){
            resolve(allLinks)
          }
        })
      })
  })
})



//entrega links si vienen de un md o de un directorio.
const linksFileOrDirectory = (path)=>{
  if(isMd(path)){
    return links(path)
  }else{
    return new Promise((resolve, reject) => { 
        readingDirect(path).then(files =>{
        handleDirectory(files).then(links=>{
          resolve(links)
        })
      })
    })
  }
}






//
const mdLinks = (path, options) =>{
if(options.stats && options.validate){
  return statsAndValidateLinks(path)
}  
if(options.stats){
  return statsLinks(path)
}if(options.validate){
  return validateLinks(path)
}else{
  return linksFileOrDirectory(path)}
}


// const statsAndValidateLinks = (path) =>{
//   return new Promise((resolve,reject)=>{
//     const validateLinksResult = validateLinks(path);
//     let brokenLinks = [0,2]
//     let result = validateLinks.map(a=>a);
//     resolve(result)
    
    

//   })
// }

//agrega "status" a cada link
// const validateLinks = (path) => {
//   return new Promise((resolve, reject) => {
//     linksFileOrDirectory(path).then(links =>{ 
//         let count = 0
//         let result = []
//         const linksLength = links.length
//           links.forEach(element =>{
//             fetch(element.href).then(res =>{
//               count++
//               element.status = res.status+" "+res.statusText
//               result.push(element)

//               if(count == linksLength){
//               resolve(result)}
//             })
//           })
//     })
//   })
// }





// const validateLinks = (path) =>{
//   return new Promise((resolve, reject) => {
  
//     linksFileOrDirectory(path).then(links =>{
      
//       let nuevoarray = [];
//       links.forEach(element =>{
        
//         fetch(element.href).then(res =>
//           nuevoarray.push(res.statusText)
//           )

         
          
   
          
//         }) 
//         resolve(nuevoarray)
  
//      })
     
//   })
// }

// [element.file+" "+element.href+" "+res.status+" "+res.statusText]
      // element["Status"] = res.status;
    // links.
    // res.status+" "+res.statusText)
    


    
//   let pat = path;
//   
//   .then(body => console.log(body));
//   return new Promise((resolve, reject) => { 
//     linksFileOrDirectory(path).then(links =>{
//   resolve(

    
    
//     links.map(obj=> ({ ...obj, status: 'ok' })))
// })
//   })}







//stats de cada link 
const statsLinks = (path) =>{
return new Promise((resolve, reject) => { 
  linksFileOrDirectory(path).then(links =>{
    const unique = links.map(x=>x.href)
    resolve("Total:"+links.length+"\n"+
      "Unique:"+unique.length)
    })
  })
}



/////////////////////////
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

mdLinks(path,options).then(algo=>{
  console.log(algo)
});


// module.exports = {
//   mdLinks
// }