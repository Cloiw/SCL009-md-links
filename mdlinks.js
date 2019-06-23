const fs = require('fs');
const marked = require('marked');

const FileHound = require('filehound');

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



//funcion para stats C:?''


// console.log(readingDirect('/home/laboratoriad128/Escritorio/SCL009-md-links/'))
// console.log(isMd("./prueba.md"))




// genera arreglo con informacion de todos los links de los archivos md del directorio
const handleDirectory = (files =>{
  return new Promise((resolve, reject)=>{
    let count = 0;
    let allLinks = []
      files.forEach(element => {
        links(element).then(unlink =>{
          count++
          allLinks = allLinks.concat(unlink)
          if(count == files.length){
            resolve(allLinks)
          }
          
          })
          
      });
    
  })
  
})

const fff = (path=>{

  if(isMd(path)){
    return links(path)
  }else{
    return new Promise((resolve, reject) => { 
        readingDirect(path).then(files =>{
        handleDirectory(files).then(algo=>{
          resolve(algo)
        })
      })
    })
  }
})



const mdLinks = (path, options) =>{

// if(options.stats && options.validate){
  
// }

// if(options.stats){

// }
// if(options.validate){

// }

return fff(path)


}



let patha = process.argv[2]
mdLinks(patha).then(algo=>{
  console.log(algo)
});


const statsLinks = () =>{
  if(isMd(path)){
}

}
