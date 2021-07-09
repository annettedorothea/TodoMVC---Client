/********************************************************************************
 * generated by de.acegen 1.3.0
 ********************************************************************************/




import AsynchronousCommand from "../../../gen/ace/AsynchronousCommand";
import TriggerAction from "../../../gen/ace/TriggerAction";
import * as Utils from "../../ace/Utils";
import * as AppUtils from "../../../src/app/AppUtils";
import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";

export default class AbstractDeleteTodoCommand extends AsynchronousCommand {
    constructor() {
        super("todo.DeleteTodoCommand");
    }
    
    initCommandData(data) {
        data.outcomes = [];
    }

	addOkOutcome(data) {
		data.outcomes.push("ok");
	}

	execute(data) {
	    return new Promise((resolve, reject) => {
			AppUtils.httpDelete(`${Utils.settings.rootPath}/todos/delete?id=${data.id}`, data.uuid, false).then(() => {
				this.handleResponse(data, resolve, reject);
			}, (error) => {
				data.error = error;
				this.handleError(data, resolve, reject);
			});
	    });
	}

    publishEvents(data) {
		if (data.outcomes.includes("ok")) {
			new TriggerAction().publish(
				new GetTodoListAction(), 
				{}
			)
		}
    }

}



/******* S.D.G. *******/



