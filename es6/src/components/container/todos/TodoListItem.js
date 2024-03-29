/********************************************************************************
 * generated by de.acegen
 ********************************************************************************/




import React from "react";

export const TodoListItem = (props) => {
	if (!props.readOnly) {
		return <li className="editing" id={props.id}>
			{props.children}
		</li>
	}
	return <li className={props.done ? 'completed' : ''} id={props.id}>
		<div className="view" id={props.id}>
			{props.children}
		</div>
	</li>
}



/******* S.D.G. *******/



