const fs = require('fs');
const marked = require('marked');
const FileHound = require('filehound');
const fetch = require('node-fetch');

//leer archivos md de directorio
const readingDirect = (path =>{
  return new Promise((resolve,reject)=>{
    FileHound.create().paths(path).ext('md').find().then(files=>{
      resolve(files)
    }).catch(err=>{
      console.log("Error: "+err.message)
    })
  })
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


// genera arreglo con informacion de todos los links de los archivos md del directorio
const handleDirectory = (files) =>{
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
}


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

//entrega la cantidad de links totales, links con status OK y links rotos.
const statsAndValidateLinks = (path) =>{
  return new Promise((resolve,reject)=>{
    validateLinks(path).then(links=>{
      const statusLinks = links.map(x=>x.status)
      let okLinks = statusLinks.toString().match(/200/g)
      const totalLinks = links.length
      let brokenLinks = 0

      if(okLinks != null){
        okLinks = okLinks.length
      }else{
        okLinks =  0
      }
      
      brokenLinks = totalLinks-okLinks
      resolve(
        "Total Links: "+totalLinks+"\n"+
        "Ok Links: "+okLinks+"\n"+
        "Broken Links: "+brokenLinks)
    })
  })
}


//valida cada link y agrega "status" a cada uno segun respuesta del fetch
const validateLinks = (path) =>{
    return new Promise((resolve, reject) => {
    linksFileOrDirectory(path).then(links =>{ 
    
      let fetchLinks = links.map(x=>{ // 
        
        return fetch(x.href).then(res =>{
            x.status = res.status+" "+res.statusText
          }).catch((err)=>{
            x.status = err.code
          }) 
      })

      Promise.all(fetchLinks).then(res=>{
        resolve(links)
      })
      
    })
 
  })

}




//stats de cada link 
const statsLinks = (path) =>{
return new Promise((resolve, reject) => { 
  linksFileOrDirectory(path).then(links =>{
    const uniqueLinks = new Set(links.map(x=>x.href))
    resolve("Total Links:"+links.length+"\n"+
      "Unique Links:"+uniqueLinks.size)
    })
  })
}



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

// mdLinks(path,options).then(algo=>{
//   console.log(algo)
//   }).catch(err=>{
//     console.log(err);
// })


module.exports = {
  mdLinks 
}