class Container extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todoList: []
        };
        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    }

    onChangeCheckbox(event) {
        new ToggleAllAction().apply();
    }

    render() {
        return (
            <div>
                <div className="learn-bar body">

                    <aside className="learn">
                        <header><h3>JavaScript</h3> <span
                            className="source-links">   <h5>Vanilla JavaScript Example</h5> <a
                            href="https://github.com/tastejs/todomvc/tree/gh-pages/examples/vanillajs">Source</a>   </span>
                        </header>
                        <hr/>
                        <blockquote className="quote speech-bubble"><p>JavaScript® (often shortened to JS) is a
                            lightweight, interpreted,
                            object-oriented language with first-class functions, most known as the scripting
                            language for Web pages, but
                            used in many non-browser environments as well such as node.js or Apache CouchDB.</p>
                            <footer><a href="http://developer.mozilla.org/en-US/docs/JavaScript">JavaScript</a>
                            </footer>
                        </blockquote>
                        <footer>
                            <hr/>
                            <em>If you have other helpful links to share, or find any of the links above no
                                longer work, please <a
                                    href="https://github.com/tastejs/todomvc/issues">let us know</a>.</em>
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
                                    checked={this.state.todoList.filter((todo) => todo.done === false).length === 0 }
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
                    </footer>


                </div>
                <Timeline {...this.state}/>
                <ReplayTimeline {...this.state}/>
            </div>

        );
    }
}

