/********************************************************************************
 * generated by de.acegen
 ********************************************************************************/




import React from "react";

import { deleteTodo } from "../../../../../gen/todo/ActionFunctions";

export const DeleteTodo = (props) => {
	return <button
		id={`delete_${props.id}`}
		className="destroy"
		onClick={() => deleteTodo(props.id)}
	>×</button>
}



/******* S.D.G. *******/



