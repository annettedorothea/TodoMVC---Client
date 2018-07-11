import React from 'react';
import CreateTodoAction from "../todo/actions/CreateTodoAction";
import NewTodoChangedAction from "../todo/actions/NewTodoChangedAction";

export default class NewTodo extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onChange(event) {
        new NewTodoChangedAction({newTodo: event.target.value}).apply();
    }

    onKeyPress(event) {
        if (event.charCode === 13) {
            new CreateTodoAction({description: this.props.newTodo}).apply();
        }
    }

    render() {
        return (
            <input
                value={this.props.newTodo}
                placeholder="What needs to be done?"
                onKeyPress={this.onKeyPress}
                onChange={this.onChange}
                className="new-todo"
            />
        );
    }
}

