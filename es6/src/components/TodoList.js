import React from 'react';
import Todo from "./Todo";

export default class TodoList extends React.Component {

    constructor(props) {
        super(props);
    }

    filter(todo, filter) {
        if (filter === 'all') {
            return true;
        } else if (filter === 'done' && todo.done === true) {
            return true;
        } else if (filter === 'open' && todo.done === false) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const todoList = this.props.todoList ? this.props.todoList.filter((todo) => this.filter(todo, this.props.filter)).map((todo) => {
            return <Todo key={todo.id} {...todo} todoList={this.props.todoList}/>
        }) : [];
        return (
            <div>
                <ul className="todo-list">
                    {todoList}
                </ul>
            </div>
        );
    }
}

