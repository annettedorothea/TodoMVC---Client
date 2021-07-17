/********************************************************************************
 * generated by de.acegen 1.3.0
 ********************************************************************************/




import Action from "../../ace/AsynchronousAction";
import CreateCategoryCommand from "../../../src/todo/commands/CreateCategoryCommand";
import * as AppState from "../../ace/AppState";
import * as AppUtils from "../../../src/app/AppUtils";

export default class AbstractCreateCategoryAction extends Action {

    constructor() {
        super('todo.CreateCategoryAction');
		this.postCall = this.postCall.bind(this);
	}
		
	getCommand() {
		return new CreateCategoryCommand();
	}

	preCall() {
		AppState.set_container_spinner_loading({loading: true});
		AppUtils.stateUpdated(AppState.getAppState());
	}
	
	postCall() {
		AppState.set_container_spinner_loading({loading: false});
		AppUtils.stateUpdated(AppState.getAppState());
	}

}




/******* S.D.G. *******/



