import Action from "../../ace/AsynchronousAction";
import GetTodoListCommand from "../../../src/todo/commands/GetTodoListCommand";
import * as AppState from "../../ace/WriteAppState";

export default class AbstractGetTodoListAction extends Action {

    constructor() {
        super({}, 'todo.GetTodoListAction');
		this.postCall = this.postCall.bind(this);
    }
    
	getCommand() {
		return new GetTodoListCommand(this.actionData);
	}

	preCall() {
		AppState.set_state_State_loading({loading: true});
	}
	
	postCall() {
		AppState.set_state_State_loading({loading: false});
	}

}

/*       S.D.G.       */
