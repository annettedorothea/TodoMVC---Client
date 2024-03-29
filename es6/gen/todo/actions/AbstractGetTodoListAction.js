/********************************************************************************
 * generated by de.acegen
 ********************************************************************************/




import Action from "../../ace/AsynchronousAction";
import GetTodoListCommand from "../../../src/todo/commands/GetTodoListCommand";
import * as AppState from "../../../src/AppState";

export default class AbstractGetTodoListAction extends Action {

    constructor() {
        super('todo.GetTodoListAction');
		this.postCall = this.postCall.bind(this);
	}
		
	getCommand() {
		return new GetTodoListCommand();
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



