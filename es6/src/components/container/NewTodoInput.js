/********************************************************************************
 * generated by de.acegen 1.2.1
 ********************************************************************************/




import React from "react";
import {newTodoChanged, newTodoKeyPressed} from "../../../gen/todo/ActionFunctions";

export function uiElement(attributes) {
	return <input
		value={attributes.newTodo}
		placeholder="What needs to be done?"
		onKeyPress={(event) => newTodoKeyPressed(event.charCode)}
		onChange={(event) => newTodoChanged(event.target.value)}
		className="new-todo"
		id="newTodoInput"
	/>
}



/******* S.D.G. *******/



