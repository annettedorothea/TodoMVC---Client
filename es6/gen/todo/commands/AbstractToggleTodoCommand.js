/********************************************************************************
 * generated by de.acegen 1.3.0
 ********************************************************************************/




import AsynchronousCommand from "../../../gen/ace/AsynchronousCommand";
import TriggerAction from "../../../gen/ace/TriggerAction";
import * as Utils from "../../ace/Utils";
import * as AppUtils from "../../../src/app/AppUtils";
import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";

export default class AbstractToggleTodoCommand extends AsynchronousCommand {
    constructor(commandData) {
        super(commandData, "todo.ToggleTodoCommand");
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
	
			AppUtils.httpPut(`${Utils.settings.rootPath}/todos/toggle?id=${this.commandData.id}`, this.commandData.uuid, false).then(() => {
				this.handleResponse(resolve, reject);
			}, (message) => {
				this.commandData.message = message;
				this.handleError(resolve, reject);
			});
	    });
	}

}




/******* S.D.G. *******/



