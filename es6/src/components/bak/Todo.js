import React from 'react';
import {
    deleteTodo,
    editedTodoChanged,
    editedTodoKeyPressed,
    editTodo,
    toggleTodo
} from "../../../gen/todo/ActionFunctions";
import {button, div, label, li, input} from "./ReactHelper"


function todoHtml(attributes) {
    const editElement = li(
        undefined,
        {
            className: 'editing',
            id: attributes.id
        },
        [
            input(
                {
                    className: "edit",
                    value: attributes.editedTodo ? attributes.editedTodo.editedDescription : "",
                    onKeyPress: (event) => editedTodoKeyPressed(event.charCode),
                    onChange: (event) => editedTodoChanged(event.target.value),
                    id: attributes.id
                }
            )
        ]
    );

    const viewElement = li(
        undefined,
        {
            className: attributes.done ? 'completed' : '',
            id: attributes.id
        },
        [
            div(
                undefined,
                {
                    className: "view",
                    id: attributes.id
                },
                [
                    input(
                        {
                            id: attributes.id,
                            className: "toggle",
                            type: "checkbox",
                            checked: attributes.done,
                            onChange: () => toggleTodo(attributes.id)
                        }
                    ),
                    label(
                        attributes.description,
                        {
                            id: `edit_${attributes.id}`,
                            onDoubleClick: () => editTodo(attributes.id)
                        }
                    ),
                    button(
                        undefined,
                        {
                            id: `delete_${attributes.id}`,
                            className: "destroy",
                            onClick: () => deleteTodo(attributes.id)
                        }
                    )
                ]
            )
        ]
    )

    if (attributes.editedTodo && attributes.editedTodo.id === attributes.id) {
        return editElement;
    }
    return viewElement;

}

export const Todo = (props) => {
    /*if (props.editedTodo && props.editedTodo.id === props.id) {
        return (
            <li className='editing'>
                <input
                    className="edit"
                    value={props.editedTodo.editedDescription}
                    onKeyPress={(event) => editedTodoKeyPressed(event.charCode)}
                    onChange={(event) => editedTodoChanged(event.target.value)}
                />
            </li>
        );
    };
    return (
        <li className={props.done ? 'completed' : ''}>
            <div className="view">
                <input
                    id={props.id}
                    className="toggle"
                    type="checkbox"
                    checked={props.done}
                    onChange={() => toggleTodo(props.id)}
                />
                <label
                    id={`edit_${props.id}`}
                    onDoubleClick={() => editTodo(props.id)}>
                    {props.description}
                </label>
                <button
                    id={`delete_${props.id}`}
                    className="destroy"
                    onClick={() => deleteTodo(props.id)}
                />
            </div>
        </li>
    );*/

    return todoHtml(props);

}
