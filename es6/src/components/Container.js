import React from 'react';
import NewTodo from "./NewTodo";
import TodoList from "./TodoList";
import Footer from "./Footer";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import * as AppState from "../../gen/ace/AppState";
import {toggleAll} from "../../gen/todo/ActionFunctions";
import Utils from "../../gen/ace/Utils";

export default class Container extends React.Component {

    constructor(props) {
        super(props);
        this.state = AppState.getAppState();
    }

    render() {
        return (
            <div>
                <ErrorMessage {...this.state} />
                <div className="learn-bar body">
                    <aside className="learn">
                        <header>
                            <h3>ACE</h3>
                            <span className="source-links">
                                <h5>ACE Example</h5>
                                <a href="https://github.com/annettedorothea/TodoMVC---Client" target="sourceclient">Source (Client)</a><br/>
                                <a href="https://github.com/annettedorothea/TodoMVC---Server" target="sourceserver">Source (Server)</a>
                            </span>
                        </header>
                        <hr/>
                        <blockquote className="quote speech-bubble">
                            <p>
                                ACE is an architecture that allows you to write an executable timeline during the
                                execution
                                of your application. ACE stands for Action - Command - Event:
                            </p>
                            <ul>
                                <li>The action captures the user input.</li>
                                <li>The command contains your business logic and fires events.</li>
                                <li>Your views listen to these events and update themselves accordingly.</li>
                            </ul>
                            <p>
                                Both client and server are implemented based on the ACE architecture.
                                The server was written in Java with Dropwizard; the client uses React.
                            </p>
                            <footer>
                                <a href="https://github.com/annettedorothea/com.anfelisa.ace.gen" target="ace">ACE Code
                                    Generator based on Xtext</a>
                            </footer>
                        </blockquote>
                        <footer>
                            <hr/>
                            <em>
                                These functions can be executed from JavaScript console:
                                <ul>
                                    <li>Todo.saveScenario("&lt;description&gt;", "&lt;your name&gt;")</li>
                                    <li>Todo.runScenario("&lt;scenarioId&gt;", "&lt;your name&gt;", &lt;pauseInMillis
                                        (default is 0)&gt;)
                                    </li>
                                    <li>Todo.runAllScenarios("&lt;your name&gt;", &lt;pauseInMillis (default is
                                        0)&gt;)
                                    </li>
                                    <li>Todo.saveBug("&lt;description&gt;", "&lt;your name&gt;")</li>
                                    <li>Todo.runBug("&lt;bugId&gt;", &lt;pauseInMillis (default is 0)&gt;)</li>
                                </ul>
                                You can view all bugs, scenarios and their execution results on <a
                                href={`${Utils.settings ? Utils.settings.aceScenariosBaseUrl : ""}#/${Utils.settings ? Utils.settings.aceScenariosApiKey : ""}/scenarios`}
                                target="acegen">acegen.de</a>.
                            </em>
                        </footer>
                    </aside>

                    <div>
                        <section className="todoapp">
                            <header className="header">
                                <h1>
                                    <span>todos</span>
                                    <Spinner {...this.state} />
                                </h1>
                                <NewTodo {...this.state}/>
                            </header>
                            <section className="main">
                                <input
                                    className="toggle-all"
                                    type="checkbox"
                                    onChange={() => toggleAll()}
                                    checked={this.state.todoList ? this.state.todoList.filter((todo) => todo.done === false).length === 0 : false}
                                />
                            </section>
                            <TodoList {...this.state}/>
                            <Footer {...this.state}/>
                        </section>
                    </div>

                    <footer className="info">
                        <p>Double-click to edit a todo</p>
                        <p>Created by Annette Pohl</p>
                    </footer>


                </div>
            </div>

        );
    }
}

