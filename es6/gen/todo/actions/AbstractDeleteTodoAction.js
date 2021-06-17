/********************************************************************************
 * generated by de.acegen 1.3.0
 ********************************************************************************/




import Action from "../../ace/AsynchronousAction";
import DeleteTodoCommand from "../../../src/todo/commands/DeleteTodoCommand";
import * as AppState from "../../ace/AppState";

export default class AbstractDeleteTodoAction extends Action {

    constructor( id) {
        super({id}, 'todo.DeleteTodoAction');
		this.postCall = this.postCall.bind(this);
	}
		
	getCommand() {
		return new DeleteTodoCommand(this.actionData);
	}

	preCall() {
		AppState.set_container_spinner_loading({loading: true});
	}
	
	postCall() {
		AppState.set_container_spinner_loading({loading: false});
	}

}




/******* S.D.G. *******/



