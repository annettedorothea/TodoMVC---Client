/********************************************************************************
 * generated by de.acegen 1.1.0
 ********************************************************************************/




import React, {useState} from 'react';
import { uiElement } from "../../src/components/Todos";

export const setTodosState = (newState) => {
    if (functions.setState) {
        functions.setState(newState);
    }
}

let functions = {};

export const TodosComponent = (props) => {
	const [state, setState] = useState();
	functions.setState = setState;
	return uiElement({...props, ...state});
}



/******* S.D.G. *******/



