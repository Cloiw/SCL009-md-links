const mdLinks = require('../md-links.js');



//stats de un directorio
test("mdLinks, deberia entregar un objeto con total: 7 y unique: 6 para la ruta test/md-files-test con stats true",  () =>{
   expect(mdLinks.mdLinks("test/md-files-test",{stats:true})).resolves.toEqual({"total":7,"unique":6})
});

//stats de un archivo
test("mdLinks, deberia entregar un objeto con total: 3 y unique: 2 para el archivo test-file-1 con stats true",  () =>{
  expect(mdLinks.mdLinks("test/md-files-test/test-file-1.md",{stats:true})).resolves.toEqual({"total":3,"unique":2})
});

//stats y validate de un archivo
test("mdLinks, deberia entregar un objeto con total:4 ok:3 y broken:1 para el archivo test-file-2 con validate y stats true", async () =>{
  await expect(mdLinks.mdLinks("test/md-files-test/test-file-2.md",{validate:true,stats:true})).resolves.toEqual({"total": 4,"ok":3,"broken":1})
});

//validate de un archivo
test("mdLinks, deberia entregar un array con objetos de cada link ", async () =>{
  await expect(mdLinks.mdLinks("test/md-files-test/test-file-2.md",{validate:true})).resolves.toEqual([{"file": "test/md-files-test/test-file-2.md", 
  "href": "https://github.com/workshopper/learnyounode", "status": "200 OK", "text": "learnyounode"}, {"file": "test/md-files-test/test-file-2.md", "href": "https://github.com/workshopper/how-to-npm", "status": "200 OK", "text": "how-to-npm"}, 
  {"file": "test/md-files-test/test-file-2.md", "href": "https://github.com/stevekane/promise-it-wont-hurt", "status": "200 OK", "text": "promise-it-wont-hurt"}, {"file": "test/md-files-test/test-file-2.md", "href": "http://fdd.com/favicon.ico", 
  "status": "404 Not Found", "text": "<img src=\"http://fdd.com/favicon.ico\" alt=\"build status\">"}])
});


//error de archivo no valido
test("mdLinks, deberia entregar un mensaje de error al no encontrar un archivo.md valido", async () =>{
await expect(mdLinks.mdLinks("test/md-files-test/test-file-3.md",{validate:false,stats:false})).rejects.toMatchObject({
    message: 'No se encontro el archivo test/md-files-test/test-file-3.md'
  })
})

//error de ruta no valida
test("mdLinks, deberia entregar un mensaje de error al no encontrar una ruta valida", async () =>{
  await expect(mdLinks.mdLinks("test/md-files-test/rutanovalida",{validate:false,stats:false})).rejects.toMatchObject({
      message: 'Ruta no valida'
  })
})

//error de argumentos
test("mdLinks, deberia entregar un mensaje de error al no encontrar argumentos", async () =>{
  await expect(mdLinks.mdLinks(null,null)).rejects.toMatchObject({
      message: 'Faltan argumentos'
  })
})

