import React from 'react';
import {createTodo, newTodoChanged} from "../../gen/todo/ActionFunctions";

export default class NewTodo extends React.Component {

    constructor(props) {
        super(props);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onKeyPress(event) {
        if (event.charCode === 13) {
            createTodo(this.props.newTodo);
        }
    }

    render() {
        return (
            <input
                value={this.props.newTodo}
                placeholder="What needs to be done?"
                onKeyPress={this.onKeyPress}
                onChange={(event) => newTodoChanged(event.target.value)}
                className="new-todo"
                id="newTodoInput"
            />
        );
    }
}

