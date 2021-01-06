import React, {useState} from 'react';
import {div, todo, ul} from "./ReactHelper"

function filter(todo, filter) {
    return filter === 'all' || filter === 'done' && todo.done === true || filter === 'open' && todo.done === false;
}

function todoListHtml(props) {
    return div(
        undefined,
        undefined,
        [
            ul(
                {
                    className: "todo-list"
                },
                [
                    props.todoList ? props.todoList.filter((todo) => filter(todo, props.filter)).map((todoElement) => {
                        return todo(
                            {
                                ...todoElement,
                                editedTodo: props.editedTodo
                            }
                        )
                    }) : []
                ]
            )
        ]
    )
}


export const TodoList = (props) => {
    /*const todoList = props.todoList ? props.todoList.filter((todo) => filter(todo, props.filter)).map((todo) => {
        return <Todo key={todo.id} {...todo} editedTodo={props.editedTodo}/>
    }) : [];
    return (
        <div>
            <ul className="todo-list">
                {todoList}
            </ul>
        </div>
    );*/

    return todoListHtml(props);

}
