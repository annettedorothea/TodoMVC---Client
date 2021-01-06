import React from 'react';
import {createTodo, newTodoChanged, newTodoKeyPressed} from "../../../gen/todo/ActionFunctions";

export default class NewTodo extends React.Component {

    render() {
        return (
            <input
                value={this.props.newTodo}
                placeholder="What needs to be done?"
                onKeyPress={(event) => newTodoKeyPressed(event.charCode)}
                onChange={(event) => newTodoChanged(event.target.value)}
                className="new-todo"
                id="newTodoInput"
            />
        );
    }
}

