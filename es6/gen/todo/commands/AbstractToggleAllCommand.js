/********************************************************************************
 * generated by de.acegen 1.3.0
 ********************************************************************************/




import AsynchronousCommand from "../../ace/AsynchronousCommand";
import TriggerAction from "../../ace/TriggerAction";
import * as Utils from "../../ace/Utils";
import * as AppUtils from "../../../src/app/AppUtils";
import * as AppState from "../../ace/AppState";
import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";

export default class AbstractToggleAllCommand extends AsynchronousCommand {
    constructor() {
        super("todo.ToggleAllCommand");
    }
    
    initCommandData(data) {
        data.categoryId = AppState.get_container_footer_categoryId();
        data.outcomes = [];
    }

	addOkOutcome(data) {
		data.outcomes.push("ok");
	}

	execute(data) {
	    return new Promise((resolve, reject) => {
			AppUtils.httpPut(`${Utils.settings.rootPath}/todos/toggle-all?categoryId=${data.categoryId}`, data.uuid, false).then(() => {
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



