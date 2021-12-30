# TodoMVC---Client

This is the client for the acegen TodoMVC sample.

See [TodoMVC](https://todo.acegen.de/#).

It is written with ES6 and React and 
is based on the [de.acegen](https://github.com/annettedorothea/de.acegen) 
DSL and code generator.

See [TodoMVC---Server](https://github.com/annettedorothea/TodoMVC---Server) for the server project.

## Setup

- You need npm
- Run ```npm install```
- Build the client with ```npm build```
- Start the client with ```npm start```

## Run E2E tests

- Start the [TodoMVC---Server](https://github.com/annettedorothea/TodoMVC---Server)
- Start the client
- Run ```npm test```

## View with DSL

- Get latest Ecplise
- Install the [de.acegen](https://github.com/annettedorothea/de.acegen) Ecplise plugin from [http://acegen.de](http://acegen.de)
- Create a project by choosing File - Import - Projects from Folder or Archive with the project root for this and the [server project](https://github.com/annettedorothea/TodoMVC---Server)
- add the server project as referenced project in the build path (right click the client project and choose Build Path)
- Open [todo-client.ace](./todo-client.ace)


## Replay

These functions can be executed from JavaScript console (even [here](https://todo.acegen.de/#) without installing anything):

- Todo.saveTimeline("&lt;description&gt;", "&lt;your name&gt;")
- Todo.replayTimeline("&lt;id&gt;", &lt;pauseInMillis (default is 0)&gt;)
- Todo.dumpTimeline()
- Todo.dumpAppState()

You can view all saved timelines on 
[acegen.de](https://acegen.de/#/336ace6-a52f-11e8-98d0-529269fb1489/scenarios).

## License
[ISC](License.txt)
