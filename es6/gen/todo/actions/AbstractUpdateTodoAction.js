/********************************************************************************
 * generated by de.acegen
 ********************************************************************************/




import Action from "../../ace/AsynchronousAction";
import UpdateTodoCommand from "../../../src/todo/commands/UpdateTodoCommand";
import * as AppState from "../../../src/AppState";

export default class AbstractUpdateTodoAction extends Action {

    constructor() {
        super('todo.UpdateTodoAction');
		this.postCall = this.postCall.bind(this);
	}
		
	getCommand() {
		return new UpdateTodoCommand();
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



