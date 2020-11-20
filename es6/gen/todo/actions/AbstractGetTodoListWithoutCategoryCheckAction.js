/********************************************************************************
 * generated by de.acegen 1.0.2
 ********************************************************************************/




import Action from "../../ace/AsynchronousAction";
import GetTodoListWithoutCategoryCheckCommand from "../../../src/todo/commands/GetTodoListWithoutCategoryCheckCommand";
import * as AppState from "../../ace/AppState";

export default class AbstractGetTodoListWithoutCategoryCheckAction extends Action {

    constructor() {
        super({}, 'todo.GetTodoListWithoutCategoryCheckAction');
		this.postCall = this.postCall.bind(this);
	}
		
	getCommand() {
		return new GetTodoListWithoutCategoryCheckCommand(this.actionData);
	}

	preCall() {
		AppState.set_loading({loading: true});
	}
	
	postCall() {
		AppState.set_loading({loading: false});
	}

}




/******* S.D.G. *******/


