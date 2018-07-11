import React from 'react';
import UpdateTodoAction from "../todo/actions/UpdateTodoAction";
import EditTodoAction from "../todo/actions/EditTodoAction";
import ToggleTodoAction from "../todo/actions/ToggleTodoAction";
import DeleteTodoAction from "../todo/actions/DeleteTodoAction";
import * as App from "../app/App";

export default class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.moveCaretAtEnd = this.moveCaretAtEnd.bind(this);
    }

    componentDidUpdate() {
        if (this.desriptionField !== undefined && this.desriptionField !== null) {
            this.desriptionField.focus();
        }
    }

    moveCaretAtEnd(e) {
        e.target.value = '';
        e.target.value = this.props.description;
    }

    onChange(event) {
        this.setState({value: event.target.value});
    }

    onChangeCheckbox(event) {
        new ToggleTodoAction(
            {
                id: this.props.id
            }).apply();
    }

    onKeyPress(event) {
        if (event.charCode === 13) {
            new UpdateTodoAction(
                {
                    id: this.props.id,
                    description: this.state.value
                }).apply();
        }
    }

    onEditClick() {
        const todoList = Object.assign([], App.container.state.todoList);
        new EditTodoAction(
            {
                id: this.props.id,
                todoList
            }).apply();
        this.setState({value: this.props.description});
    }

    onDeleteClick() {
        new DeleteTodoAction({id: this.props.id}).apply();
    }

    render() {
        if (this.props.editable === true) {
            return (
                <li className='editing'>
                    <input
                        className="edit"
                        value={this.state.value}
                        onKeyPress={this.onKeyPress}
                        onChange={this.onChange}
                        onFocus={this.moveCaretAtEnd}
                        ref={(input) => {
                            this.desriptionField = input;
                        }}
                    />
                </li>
            );
        }
        return (
            <li className={this.props.done ? 'completed' : ''}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={this.props.done}
                        onChange={this.onChangeCheckbox}
                    />
                    <label onDoubleClick={this.onEditClick}>{this.props.description}</label>
                    <button className="destroy" onClick={this.onDeleteClick}/>
                </div>
            </li>
        );
    }
}

