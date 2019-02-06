import Action from "../../ace/AsynchronousAction";
import ClearDoneCommand from "../../../src/todo/commands/ClearDoneCommand";
import * as AppState from "../../ace/WriteAppState";

export default class AbstractClearDoneAction extends Action {

    constructor() {
        super({}, 'todo.ClearDoneAction');
		this.postCall = this.postCall.bind(this);
    }
    
	getCommand() {
		return new ClearDoneCommand(this.actionData);
	}

	preCall() {
		AppState.set_state_State_loading({loading: true});
	}
	
	postCall() {
		AppState.set_state_State_loading({loading: false});
	}

}

/*       S.D.G.       */
