import Action from "../../ace/AsynchronousAction";
import ToggleAllCommand from "../../../src/todo/commands/ToggleAllCommand";
import * as AppState from "../../ace/AppState";

export default class AbstractToggleAllAction extends Action {

    constructor() {
        super({}, 'todo.ToggleAllAction');
		this.postCall = this.postCall.bind(this);
    }
    
	getCommand() {
		return new ToggleAllCommand(this.actionData);
	}

	preCall() {
		AppState.set_state_State_loading({loading: true});
	}
	
	postCall() {
		AppState.set_state_State_loading({loading: false});
	}

}

/*       S.D.G.       */
