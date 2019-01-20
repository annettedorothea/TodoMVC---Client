import Action from "../../ace/AsynchronousAction";
import ToggleTodoCommand from "../../../src/todo/commands/ToggleTodoCommand";
import * as AppState from "../../ace/AppState";

export default class AbstractToggleTodoAction extends Action {

    constructor( id) {
        super({id}, 'todo.ToggleTodoAction');
		this.postCall = this.postCall.bind(this);
    }
    
	getCommand() {
		return new ToggleTodoCommand(this.actionData);
	}

	preCall() {
		AppState.set_state_State_loading({loading: true});
	}
	
	postCall() {
		AppState.set_state_State_loading({loading: false});
	}

}

/*       S.D.G.       */
