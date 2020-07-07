# TodoMVC---Client

This is the client for the acegen TodoMVC sample.

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
  "aceScenariosApiKey": "336ace6-a52f-11e8-98d0-529269fb1489",
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

## Replay

These functions can be executed from JavaScript console when the app and 
a server in dev and a server in replay mode  is running:

- Todo.saveScenario("description", "your name")
- Todo.runScenario("scenarioId", "your name", pauseInMillis (default is 0))
- Todo.runAllScenarios("your name", pauseInMillis (default is 0))
- Todo.saveBug("description", "your name")
- Todo.runBug("bugId", pauseInMillis (default is 0))

You can view all bugs, scenarios and their execution results on 
[acegen.de](https://acegen.de/#/336ace6-a52f-11e8-98d0-529269fb1489/scenarios).

## License
[ISC](License.txt)
