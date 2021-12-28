/********************************************************************************
 * generated by de.acegen
 ********************************************************************************/




import Action from "../../ace/AsynchronousAction";
import ToggleAllCommand from "../../../src/todo/commands/ToggleAllCommand";
import * as AppState from "../../../src/AppState";

export default class AbstractToggleAllAction extends Action {

    constructor() {
        super('todo.ToggleAllAction');
		this.postCall = this.postCall.bind(this);
	}
		
	getCommand() {
		return new ToggleAllCommand();
	}

	preCall() {
		AppState.set(
			{loading: true}, 
			["container", "spinner", "loading"]
		)
		AppState.stateUpdated();
	}
	
	postCall() {
		AppState.set(
			{loading: false}, 
			["container", "spinner", "loading"]
		)
		AppState.stateUpdated();
	}

}




/******* S.D.G. *******/



