/********************************************************************************
 * generated by de.acegen 1.2.1
 ********************************************************************************/


import React from "react";
import {ErrorComponent} from "../../gen/components/container/ErrorComponent";
import Utils from "../../gen/ace/Utils";
import {SpinnerComponent} from "../../gen/components/container/SpinnerComponent";
import {NewTodoInputComponent} from "../../gen/components/container/NewTodoInputComponent";
import {toggleAll} from "../../gen/todo/ActionFunctions";
import {TodosComponent} from "../../gen/components/container/TodosComponent";
import {FooterComponent} from "../../gen/components/container/FooterComponent";

export function uiElement(attributes) {
    return <div>
        <ErrorComponent {...attributes.error}/>
        <div className="learn-bar body">
            <aside className="learn">
                <header>
                    <h3>ACE</h3>
                    <span className={"source-links"}>
						<h5>ACE Example</h5>
						<a href="https://github.com/annettedorothea/TodoMVC---Client" target="sourceclient">
							Source Client
						</a>
						<br/>
						<a href="https://github.com/annettedorothea/TodoMVC---Server" target="sourceserver">
							Source Server
						</a>
					</span>
                </header>
                <hr/>
                <blockquote className="quote speech-bubble">
                    <p>ACE is an architecture that allows you to write an executable timeline during the execution of
                        your application. ACE stands for Action - Command - Event:</p>
                    <ul>
                        <li>The action initializes non-deterministic data.</li>
                        <li>The command contains the business logic and fires events.</li>
                        <li>The views listen to these events and update themselves accordingly.</li>
                    </ul>
                    <p>Both client and server are implemented based on the ACE architecture. The server was written in
                        Java with Dropwizard; the client uses React.</p>
                    <footer>
                        <a href="https://github.com/annettedorothea/com.anfelisa.ace.gen" target="ace">
                            ACE Code Generator based on Xtext
                        </a>
                    </footer>
                </blockquote>
                <footer>
                    <hr/>
                    <em>
                        These functions can be executed from JavaScript console:
                        <ul>
                            <li>Todo.saveTimeline(&lt;description&gt;, &lt;your name&gt;)</li>
                            <li>Todo.replayTimeline(&lt;id&gt;, &lt;pauseInMillis (default and minimum are 100)&gt;)
                            </li>
                            <li>Todo.dumpTimeline()</li>
                            <li>Todo.dumpAppState()</li>
                            You can view all saved timelines on <a
                            href={`${Utils.settings ? Utils.settings.aceScenariosBaseUrl : ""}#/${Utils.settings ? Utils.settings.aceScenariosApiKey : ""}`}
                            target="acegen"
                        >acegen.de</a>.
                        </ul>
                    </em>
                </footer>
            </aside>
            <div>
                <section className="todoapp">
                    <header className="header">
                        <h1>
                            <span>todos</span>
                            <SpinnerComponent {...attributes.spinner}/>
                        </h1>
                        <NewTodoInputComponent {...attributes.newTodoInput}/>
                    </header>
                    <section className="main">
                        <input
                            className="toggle-all"
                            type="checkbox"
                            onChange={toggleAll}
                            checked={attributes.todos && attributes.todos.todoList ? attributes.todos.todoList.filter((todo) => todo.done === false).length === 0 : false}
                        />
                    </section>
                    <TodosComponent {...attributes.todos} filter={attributes.filter}/>
                    <FooterComponent
                        categoryId={attributes.footer ? attributes.footer.categoryId: ""}
                        filter={attributes.filter}
                        itemCount
                    />
                </section>
            </div>
            <footer className="info">
                <p>Double-click to edit a todo.</p>
                <p>Created by Annette Pohl.</p>
            </footer>
        </div>
    </div>
}


/******* S.D.G. *******/



