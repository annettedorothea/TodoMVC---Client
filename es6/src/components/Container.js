import React from 'react';
import NewTodo from "./NewTodo";
import TodoList from "./TodoList";
import Footer from "./Footer";
import Timeline from "./Timeline";
import ReplayTimeline from "./ReplayTimeline";
import Spinner from "./Spinner";
import ToggleAllAction from "../todo/actions/ToggleAllAction";
import BugAction from "../todo/actions/BugAction";

export default class Container extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todoList: []
        };
        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
        this.onBug = this.onBug.bind(this);
    }

    onChangeCheckbox(event) {
        new ToggleAllAction().apply();
    }

    onBug() {
        new BugAction().apply();
    }

    render() {
        return (
            <div>
                <Spinner {...this.state} />
                <div className="learn-bar body">
                    <aside className="learn">
                        <header>
                            <h3>ACE</h3>
                            <span className="source-links">
                                <h5>ACE Example</h5>
                                <a href="https://github.com/annettedorothea/TodoMVC---Client">Source (Client)</a><br/>
                                <a href="https://github.com/annettedorothea/TodoMVC---Server">Source (Server)</a>
                            </span>
                        </header>
                        <hr/>
                        <blockquote className="quote speech-bubble">
                            <p>
                                ACE is an architecture that allows you to write an executable timeline during the execution
                                of your application. ACE stands for Action - Command - Event:
                            </p>
                            <ul>
                                <li>The action captures the user input.</li>
                                <li>The command contains your business logic and fires events.</li>
                                <li>Your views listen to these events and update themselves accordingly.</li>
                            </ul>
                            <p>
                                Both client and server are implemented based on the ACE architecture.
                                The server was written in Java with Dropwizard and the client uses React.
                            </p>
                            <footer>
                                <a href="https://github.com/annettedorothea/com.anfelisa.ace.gen">ACE Code Generator based on Xtext</a>
                            </footer>
                        </blockquote>
                        <footer>
                            <hr/>
                            <em>
                                Client replay does not send requests to the server but uses the captured data in the command.
                                The E2E replay first resets a replay database, makes all changes up to the desired scenario and
                                then executes the scenario end-to-end. The replay is delayed by 1000 ms.
                            </em>
                        </footer>
                    </aside>

                    <div>
                        <section className="todoapp">
                            <header className="header">
                                <h1>todos</h1>
                                <NewTodo {...this.state}/>
                            </header>
                            <section className="main">
                                <input
                                    className="toggle-all"
                                    type="checkbox"
                                    onChange={this.onChangeCheckbox}
                                    checked={this.state.todoList ? this.state.todoList.filter((todo) => todo.done === false).length === 0 : false }
                                />
                            </section>
                            <TodoList {...this.state}/>
                            <Footer {...this.state}/>
                        </section>
                    </div>

                    <footer className="info">
                        <p>Double-click to edit a todo</p>
                        <p>Created by Annette Pohl</p>
                        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
                        <p><a onClick={this.onBug}>Bug</a></p>
                    </footer>


                </div>
                <Timeline {...this.state}/>
                <ReplayTimeline {...this.state}/>
            </div>

        );
    }
}

