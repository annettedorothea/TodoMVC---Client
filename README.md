# TodoMVC---Client

This is the server for the acegen TodoMVC sample.

See [TodoMVC](https://todo.acegen.de/#).

It is written with ES6 and React and 
is based on the [de.acegen](https://github.com/annettedorothea/de.acegen) 
DSL and code generator.

See [TodoMVC---Server](https://github.com/annettedorothea/TodoMVC---Server) for the server project.

## Installation

- Install npm on your system.
- Create a settings.json file in the root directory of the project:
```
{
  "aceScenariosApiKey": "2202ddf3-0f76-4e1a-9766-acea7edb17ab",
  "aceScenariosBaseUrl": "https://acegen.de/",
  "clientVersion": "<version>",
  "development": true | false,
  "rootPath": "<root path as configured in your dropwizard yml file of the server, e.g. api>",
  "replayRootPath": "<root path as configured in your dropwizard yml file of the server, e.g. replay>",
  "timelineSize": <timeline size, e.g. 32>
}
```
- Run ```npm install```. 
- Start the server with ```npm start```.

If you want to use the [de.acegen](https://github.com/annettedorothea/de.acegen) 
Eclpise plugin, see [TodoMVC---Server](https://github.com/annettedorothea/TodoMVC---Server)
for instructions.

## License
[ISC](License.txt)
