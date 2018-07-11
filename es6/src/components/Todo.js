import React from 'react';
import UpdateTodoAction from "../todo/actions/UpdateTodoAction";
import EditTodoAction from "../todo/actions/EditTodoAction";
import ToggleTodoAction from "../todo/actions/ToggleTodoAction";
import DeleteTodoAction from "../todo/actions/DeleteTodoAction";
import * as App from "../app/App";
import NewTodoChangedAction from "../todo/actions/NewTodoChangedAction";
import EditedTodoChangedAction from "../todo/actions/EditedTodoChangedAction";

export default class Todo extends React.Component {

    constructor(props) {
        super(props);
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
        const todoList = Object.assign([], this.props.todoList);
        new EditedTodoChangedAction(
            {
                editedTodo: event.target.value,
                todoList,
                id: this.props.id
            }).apply();
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
                    description: this.props.editedTodo
                }).apply();
        }
    }

    onEditClick() {
        const todoList = Object.assign([], this.props.todoList);
        new EditTodoAction(
            {
                id: this.props.id,
                todoList
            }).apply();
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
                        value={this.props.editedTodo}
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

