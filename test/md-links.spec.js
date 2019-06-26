const mdLinks = require('../md-links.js');



//stats de un directorio
test("mdLinks, deberia entregar Total Links: 7 Unique Links: 6 para la ruta test/md-files-test con stats true",  () =>{
   expect(mdLinks.mdLinks("test/md-files-test",{stats:true})).resolves.toEqual("Total Links:"+7+"\n"+"Unique Links:"+6)
});

//stats de un archivo
test("mdLinks, deberia entregar Total Links: 3 Unique Links: 2 para el archivo test-file-1 con stats true",  () =>{
  expect(mdLinks.mdLinks("test/md-files-test/test-file-1.md",{stats:true})).resolves.toEqual("Total Links:"+3+"\n"+"Unique Links:"+2)
});

//stats y validate de un archivo
test("mdLinks, deberia entregar Total Links: 4 Ok Links: 3 y Broken Links: 1 para el archivo test-file-2 con validate y stats true", async () =>{
  await expect(mdLinks.mdLinks("test/md-files-test/test-file-2.md",{validate:true,stats:true})).resolves.toEqual("Total Links: "+4+"\n"+
  "Ok Links: "+3+"\n"+
  "Broken Links: "+1)
});

//validate de un archivo
test("mdLinks, deberia entregar un array con objetos de cada link ", async () =>{
  await expect(mdLinks.mdLinks("test/md-files-test/test-file-2.md",{validate:true})).resolves.toEqual([{"file": "test/md-files-test/test-file-2.md", 
  "href": "https://github.com/workshopper/learnyounode", "status": "200 OK", "text": "learnyounode"}, {"file": "test/md-files-test/test-file-2.md", "href": "https://github.com/workshopper/how-to-npm", "status": "200 OK", "text": "how-to-npm"}, 
  {"file": "test/md-files-test/test-file-2.md", "href": "https://github.com/stevekane/promise-it-wont-hurt", "status": "200 OK", "text": "promise-it-wont-hurt"}, {"file": "test/md-files-test/test-file-2.md", "href": "http://fdd.com/favicon.ico", 
  "status": "404 Not Found", "text": "<img src=\"http://fdd.com/favicon.ico\" alt=\"build status\">"}])
});



// it('tests error with async/await', async () => {
  
//   try {
//     await mdLinks.mdLinks("test/md-files-test/test-file-2.md",{validate:true,stats:true});
//   } catch (e) {
//     expect(e).toEqual({
//       error :"Error: ENOENT: no such file or directory, stat 'README.txt'" , 
//     });
//   }
// });
