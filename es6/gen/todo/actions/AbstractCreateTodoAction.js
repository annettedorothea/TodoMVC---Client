import Action from "../../ace/AsynchronousAction";
import CreateTodoCommand from "../../../src/todo/commands/CreateTodoCommand";
import * as AppState from "../../ace/AppState";

export default class AbstractCreateTodoAction extends Action {

    constructor( description) {
        super({description}, 'todo.CreateTodoAction');
		this.postCall = this.postCall.bind(this);
    }
    
	getCommand() {
		return new CreateTodoCommand(this.actionData);
	}

	preCall() {
		AppState.set_state_State_loading({loading: true});
	}
	
	postCall() {
		AppState.set_state_State_loading({loading: false});
	}

}

/*       S.D.G.       */
