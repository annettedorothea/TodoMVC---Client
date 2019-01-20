import React from 'react';
import {deleteTodo, editedTodoChanged, editTodo, toggleTodo, updateTodo} from "../../gen/todo/ActionFunctions";

export default class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.onKeyPress = this.onKeyPress.bind(this);
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

    onKeyPress(event) {
        if (event.charCode === 13) {
            updateTodo();
        }
    }

    render() {
        if (this.props.editedTodo && this.props.editedTodo.id === this.props.id) {
            return (
                <li className='editing'>
                    <input
                        className="edit"
                        value={this.props.editedTodo.editedDescription}
                        onKeyPress={this.onKeyPress}
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
                        className="toggle"
                        type="checkbox"
                        checked={this.props.done}
                        onChange={() => toggleTodo(this.props.id)}
                    />
                    <label onDoubleClick={() => editTodo(this.props.id)}>{this.props.description}</label>
                    <button className="destroy" onClick={() => deleteTodo(this.props.id)}/>
                </div>
            </li>
        );
    }
}

