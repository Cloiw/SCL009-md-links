const fs = require('fs');
const marked = require('marked');

const FileHound = require('filehound');

//leer archivo md de directorio
const readingDirect = (path =>{
const files = FileHound.create().paths(path).ext('md').find();
// files.then(console.log);
return files;
})


//obtener links
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



const isMd =  (text =>{
  if(text.slice(-3)== ".md"){
    return true;
  }
  return false;
})



//funcion para stats C:?''


// console.log(readingDirect('/home/laboratoriad128/Escritorio/SCL009-md-links/'))
// console.log(isMd("./prueba.md"))




const loquequiera = (files =>{
  return new Promise((resolve, reject)=>{
    let contadors = 0;
    let superarreglo = []
      files.forEach(element => {
        links(element).then(unlink =>{
          contadors++
          superarreglo = superarreglo.concat(unlink)
          if(contadors == files.length){
            resolve(superarreglo)
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
        loquequiera(files).then(algo=>{
          resolve(algo)
        })
      })
    })
  }
})



const mdLinks = (path, options) =>{

if(options.stats && options.validate){
  
}

if(options.stats){

}
if(options.validate){

}

return fff(path)


}



let patha = process.argv[2]
mdLinks(patha).then(algo=>{
  console.log(algo)
});


const statsLinks = () =>{
  if(isMd(path)){
}

  
