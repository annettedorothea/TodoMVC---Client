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
  "rootPath": "<root path as configured in your dropwizard yml file of the server, e.g. api>",
  "timelineSize": <timeline size, e.g. 32>
}
```
- Run ```npm install```. 
- Start the server with ```npm start```.
- Install the [de.acegen](https://github.com/annettedorothea/de.acegen) Ecplise plugin from [http://acegen.de](http://acegen.de).

## Replay

These functions can be executed from JavaScript console:

- Todo.saveTimeline("&lt;description&gt;", "&lt;your name&gt;")
- Todo.replayTimeline("&lt;id&gt;", &lt;pauseInMillis (default is 0)&gt;)
- Todo.dumpTimeline()
- Todo.dumpAppState()

You can view all saved timelines on 
[acegen.de](https://acegen.de/#/336ace6-a52f-11e8-98d0-529269fb1489/scenarios).

## License
[ISC](License.txt)
