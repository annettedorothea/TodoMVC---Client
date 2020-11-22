import React from 'react';
import {
    deleteTodo,
    editedTodoChanged,
    editTodo,
    toggleTodo,
    editedTodoKeyPressed
} from "../../gen/todo/ActionFunctions";

export default class Todo extends React.Component {

    constructor(props) {
        super(props);
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

    render() {
        if (this.props.editedTodo && this.props.editedTodo.id === this.props.id) {
            return (
                <li className='editing'>
                    <input
                        className="edit"
                        value={this.props.editedTodo.editedDescription}
                        onKeyPress={(event) => editedTodoKeyPressed(event.charCode)}
                        onChange={(event) => editedTodoChanged(event.target.value)}
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
                        id={this.props.id}
                        className="toggle"
                        type="checkbox"
                        checked={this.props.done}
                        onChange={() => toggleTodo(this.props.id)}
                    />
                    <label
                        id={`edit_${this.props.id}`}
                        onDoubleClick={() => editTodo(this.props.id)}>
                        {this.props.description}
                    </label>
                    <button
                        id={`delete_${this.props.id}`}
                        className="destroy"
                        onClick={() => deleteTodo(this.props.id)}
                    />
                </div>
            </li>
        );
    }
}

