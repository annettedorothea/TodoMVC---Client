import React from 'react';
import * as AppState from "../../gen/ace/AppState";
import {clearDone, toggleAll} from "../../gen/todo/ActionFunctions";
import Utils from "../../gen/ace/Utils";
import {TodosComponent} from "../../gen/components/TodosComponent";
import Footer from "./bak/Footer";
import {SpinnerComponent} from "../../gen/components/SpinnerComponent";
import {NewTodoInputComponent} from "../../gen/components/NewTodoInputComponent";
import {ErrorComponent} from "../../gen/components/ErrorComponent";

export default class Container extends React.Component {

    constructor(props) {
        super(props);
        this.state = AppState.getAppState();
    }

    render() {
        const itemCount = this.state.todos.todoList ? this.state.todos.todoList.filter((todo) => todo.done !== true).length : 0;
        const itemsString = itemCount === 1 ? 'item' : 'items';
        return (
            <div>
                <ErrorComponent {...this.state.error} />
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
                                <li>The action initializes non-deterministic data.</li>
                                <li>The command contains the business logic and fires events.</li>
                                <li>The views listen to these events and update themselves accordingly.</li>
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
                                    <li>Todo.saveTimeline("&lt;description&gt;", "&lt;your name&gt;")</li>
                                    <li>Todo.replayTimeline("&lt;id&gt;", &lt;pauseInMillis (default and minimum are 100)&gt;)</li>
                                    <li>Todo.dumpTimeline()</li>
                                    <li>Todo.dumpAppState()</li>
                                </ul>
                                You can view all saved timelines on <a
                                href={`${Utils.settings ? Utils.settings.aceScenariosBaseUrl : ""}#/${Utils.settings ? Utils.settings.aceScenariosApiKey : ""}`}
                                target="acegen">acegen.de</a>.
                            </em>
                        </footer>
                    </aside>

                    <div>
                        <section className="todoapp">
                            <header className="header">
                                <h1>
                                    <span>todos</span>
                                    <SpinnerComponent {...this.state.spinner} />
                                </h1>
                                <NewTodoInputComponent {...this.state.newTodoInput}/>
                            </header>
                            <section className="main">
                                <input
                                    className="toggle-all"
                                    type="checkbox"
                                    onChange={() => toggleAll()}
                                    checked={this.state.todos.todoList ? this.state.todos.todoList.filter((todo) => todo.done === false).length === 0 : false}
                                />
                            </section>
                            <TodosComponent {...this.state}/>
                            <footer className="footer">
                                <span className="todo-count">{itemCount} {itemsString} left</span>
                                <ul className="filters">
                                    <li>
                                        <a href={`#/${this.state.categoryId}`} className={this.state.filter === 'all' ? 'selected' : ''}>All</a>
                                    </li>
                                    <li>
                                        <a href={`#/${this.state.categoryId}/open`} className={this.state.filter === 'open' ? 'selected' : ''}>Active</a>
                                    </li>
                                    <li>
                                        <a href={`#/${this.state.categoryId}/done`} className={this.state.filter === 'done' ? 'selected' : ''}>Completed</a>
                                    </li>
                                </ul>
                                <button className="clear-completed" onClick={() => clearDone()}>Clear completed</button>
                            </footer>
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

