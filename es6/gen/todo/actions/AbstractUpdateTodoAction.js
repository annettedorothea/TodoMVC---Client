/********************************************************************************
 * generated by de.acegen 1.2.1
 ********************************************************************************/




import Action from "../../ace/AsynchronousAction";
import UpdateTodoCommand from "../../../src/todo/commands/UpdateTodoCommand";
import * as AppState from "../../ace/AppState";

export default class AbstractUpdateTodoAction extends Action {

    constructor() {
        super({}, 'todo.UpdateTodoAction');
		this.postCall = this.postCall.bind(this);
	}
		
	getCommand() {
		return new UpdateTodoCommand(this.actionData);
	}

	preCall() {
		AppState.set_container_spinner_loading({loading: true});
	}
	
	postCall() {
		AppState.set_container_spinner_loading({loading: false});
	}

}




/******* S.D.G. *******/



