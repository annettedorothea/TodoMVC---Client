import Action from "../../ace/AsynchronousAction";
import DeleteTodoCommand from "../../../src/todo/commands/DeleteTodoCommand";
import * as AppState from "../../ace/WriteAppState";

export default class AbstractDeleteTodoAction extends Action {

    constructor( id) {
        super({id}, 'todo.DeleteTodoAction');
		this.postCall = this.postCall.bind(this);
    }
    
	getCommand() {
		return new DeleteTodoCommand(this.actionData);
	}

	preCall() {
		AppState.set_state_State_loading({loading: true});
	}
	
	postCall() {
		AppState.set_state_State_loading({loading: false});
	}

}

/*       S.D.G.       */
