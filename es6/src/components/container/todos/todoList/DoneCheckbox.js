/********************************************************************************
 * generated by de.acegen
 ********************************************************************************/




import React from "react";

import { toggleTodo } from "../../../../../gen/todo/ActionFunctions";

export const DoneCheckbox = (props) => {
	return <input
		id={`checkbox_${props.id}`}
		className="toggle"
		type="checkbox"
		checked={props.done}
		onChange={() => toggleTodo(props.id)}
	/>
}



/******* S.D.G. *******/


