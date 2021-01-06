/********************************************************************************
 * generated by de.acegen 1.1.0
 ********************************************************************************/




import AsynchronousCommand from "../../../gen/ace/AsynchronousCommand";
import TriggerAction from "../../../gen/ace/TriggerAction";
import Utils from "../../ace/Utils";
import AppUtils from "../../../src/app/AppUtils";
import * as AppState from "../../ace/AppState";
import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";

export default class AbstractToggleAllCommand extends AsynchronousCommand {
    constructor(commandData) {
        super(commandData, "todo.ToggleAllCommand");
        this.commandData.categoryId = AppState.get_categoryId();
        this.commandData.outcomes = [];
    }

	addOkOutcome() {
		this.commandData.outcomes.push("ok");
	}

    publishEvents() {
		let promises = [];
	    
		if (this.commandData.outcomes.includes("ok")) {
			promises.push(new TriggerAction(new GetTodoListAction()).publish());
		}
		return Promise.all(promises);
    }
    
	execute() {
	    return new Promise((resolve, reject) => {
	
			AppUtils.httpPut(`${Utils.settings.rootPath}/todos/toggle-all?categoryId=${this.commandData.categoryId}`, this.commandData.uuid, false).then(() => {
				this.handleResponse(resolve, reject);
			}, (error) => {
				this.commandData.error = error;
				this.handleError(resolve, reject);
			});
	    });
	}

}




/******* S.D.G. *******/



