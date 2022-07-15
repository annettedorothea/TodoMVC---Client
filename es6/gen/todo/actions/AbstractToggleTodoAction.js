/********************************************************************************
 * generated by de.acegen
 ********************************************************************************/




import Action from "../../ace/AsynchronousAction";
import ToggleTodoCommand from "../../../src/todo/commands/ToggleTodoCommand";
import * as AppState from "../../../src/AppState";

export default class AbstractToggleTodoAction extends Action {

    constructor() {
        super('todo.ToggleTodoAction');
		this.postCall = this.postCall.bind(this);
	}
		
	getCommand() {
		return new ToggleTodoCommand();
	}

	preCall() {
		AppState.merge(
			{display: true}, 
			["container", "header", "heading", "spinner", "display"]
		)
		AppState.stateUpdated();
	}
	
	postCall() {
		AppState.merge(
			{display: false}, 
			["container", "header", "heading", "spinner", "display"]
		)
		AppState.stateUpdated();
	}

}




/******* S.D.G. *******/



