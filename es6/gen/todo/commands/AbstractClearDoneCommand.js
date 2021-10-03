/********************************************************************************
 * generated by de.acegen 1.5.4
 ********************************************************************************/




import AsynchronousCommand from "../../ace/AsynchronousCommand";
import TriggerAction from "../../ace/TriggerAction";
import * as AppUtils from "../../../src/app/AppUtils";
import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";

export default class AbstractClearDoneCommand extends AsynchronousCommand {
    constructor() {
        super("todo.ClearDoneCommand");
    }
    
    initCommandData(data) {
        data.categoryId = AppUtils.get(
        	["container", "footer", "categoryId"]
        );
        data.outcomes = [];
    }

	addOkOutcome(data) {
		data.outcomes.push("ok");
	}

	execute(data) {
	    return new Promise((resolve, reject) => {
			AppUtils.httpDelete(`${AppUtils.settings.rootPath}/todos/clear-done?categoryId=${data.categoryId}`, data.uuid, false).then(() => {
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
					{
					}
			)
		}
    }

}



/******* S.D.G. *******/



