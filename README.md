[![npm version](https://badge.fury.io/js/cloiw-md-links.svg)](https://badge.fury.io/js/cloiw-md-links)
[![Build Status](https://travis-ci.org/Cloiw/SCL009-md-links.svg?branch=master)](https://travis-ci.org/Cloiw/SCL009-md-links)


# Markdown Links

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.



## Instrucciones

Para instalar utilizar el siguiente comando en la terminal: 
```sh
npm install cloiw-md-links
```




### JavaScript API



#### `mdLinks(path, options)`


##### Argumentos

- `path`: Ruta absoluta o relativa al archivo o directorio.

- `options`: Un objeto con las siguientes propiedades:
  * `validate`: Booleano que determina si se desea validar los links
    encontrados.
  * `stats`: Booleano que determina si se desea ver estadisticas de los links.

##### Valor de retorno
La función retorna una promesa (Promise) que resuelve a un arreglo (Array) de objetos (Object), donde cada objeto representa un link y contiene las siguientes propiedades:

- href: URL encontrada.
- text: Texto que aparecía dentro del link
- file: Ruta del archivo donde se encontró el link.

```sh
const mdLinks = require('cloiw-md-links');


mdLinks.mdLinks('./test_folder',{validate:false,stats:false})
  .then(res => {
    // => [{ href, text, file }]
  }).catch(err=>{
  console.log(err)
})


mdLinks.mdLinks('./test_folder',{validate:false,stats:true}).then(res => {
   // => Total Links: Unique Links: ;
}).catch(err=>{
  console.log(err)
})
```

### CLI (Command Line Interface - Interfaz de Línea de Comando)


`md-links <path-to-file> [options]`



```sh
$ md-links  example.md  
[ { href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'test/md-files-test/test-file-1.md' },
  { href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'test/md-files-test/test-file-1.md' },
  { href: 'https://docs.npmjs.com/getting-started/what-is-npm',
    text: 'NPM',
    file: 'test/md-files-test/test-file-1.md' } ]
```


#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo hace una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

```sh
$ md-links ./some/example.md --validate
[ { href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'test/md-files-test/test-file-1.md',
    status: '200 OK' },
  { href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'test/md-files-test/test-file-1.md',
    status: '200 OK' },
  { href: 'https://docs.npmjs.com/getting-started/what-is-npm',
    text: 'NPM',
    file: 'test/md-files-test/test-file-1.md',
    status: '200 OK' } ]
```


##### `--stats`

Si pasamos la opción `--stats` el output será un texto con el total de links y el total de links únicos.

```sh
$ md-links example.md --stats
Total Links: 3
Unique Links: 1
```
##### `--stats` `--validate` 
También podemos combinar `--stats` y `--validate` para obtener la cantidad de links buenos y rotos.

```sh
$ md-links example.md --stats --validate
Total Links: 3
Ok Links: 3
Broken Links: 0
```



### Planificación
[Trello](https://trello.com/b/VDuDqwdZ/md-links) 

