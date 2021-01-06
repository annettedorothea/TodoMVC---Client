/********************************************************************************
 * generated by de.acegen 1.1.0
 ********************************************************************************/


import {input} from "../../gen/components/ReactHelper";
import {newTodoChanged, newTodoKeyPressed} from "../../gen/todo/ActionFunctions";
import React from "react";

export function jsx(attributes) {
    return input({
        value: attributes.newTodo,
        placeholder: "What needs to be done?",
        onKeyPress: (event) => newTodoKeyPressed(event.charCode),
        onChange: (event) => newTodoChanged(event.target.value),
        className: "new-todo",
        id: "newTodoInput",
    });
}


/******* S.D.G. *******/



