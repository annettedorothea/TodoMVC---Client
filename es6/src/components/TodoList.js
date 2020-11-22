import React from 'react';
import Todo from "./Todo";

export default class TodoList extends React.Component {

    filter(todo, filter) {
        return filter === 'all' || filter === 'done' && todo.done === true || filter === 'open' && todo.done === false;
    }

    render() {
        const todoList = this.props.todoList ? this.props.todoList.filter((todo) => this.filter(todo, this.props.filter)).map((todo) => {
            return <Todo key={todo.id} {...todo} editedTodo={this.props.editedTodo}/>
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

