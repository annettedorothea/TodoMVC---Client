/********************************************************************************
 * generated by de.acegen 1.3.0
 ********************************************************************************/




import AsynchronousCommand from "../../ace/AsynchronousCommand";
import Event from "../../ace/Event";
import TriggerAction from "../../ace/TriggerAction";
import * as Utils from "../../ace/Utils";
import * as AppUtils from "../../../src/app/AppUtils";
import * as AppState from "../../ace/AppState";
import CalculateItemCountAction from "../../../src/todo/actions/CalculateItemCountAction";
import CreateCategoryAction from "../../../src/todo/actions/CreateCategoryAction";

export default class AbstractGetTodoListCommand extends AsynchronousCommand {
    constructor() {
        super("todo.GetTodoListCommand");
    }
    
    initCommandData(data) {
        data.categoryId = AppState.get_container_footer_categoryId();
        data.outcomes = [];
    }

	addOkOutcome(data) {
		data.outcomes.push("ok");
	}
	addCategoryDoesNotExistOutcome(data) {
		data.outcomes.push("categoryDoesNotExist");
	}

	execute(data) {
	    return new Promise((resolve, reject) => {
			AppUtils.httpGet(`${Utils.settings.rootPath}/todos/all?categoryId=${data.categoryId}`, data.uuid, false).then((response) => {
				data.todoList = response.todoList;
				this.handleResponse(data, resolve, reject);
			}, (error) => {
				data.error = error;
				this.handleError(data, resolve, reject);
			});
	    });
	}

    publishEvents(data) {
		if (data.outcomes.includes("ok")) {
			new Event('todo.GetTodoListOkEvent').publish(data);
			AppUtils.stateUpdated(AppState.getAppState());
			new TriggerAction().publishWithDelay(
				new CalculateItemCountAction(), 
					{
					},
				100
			)
		}
		if (data.outcomes.includes("categoryDoesNotExist")) {
			new TriggerAction().publish(
				new CreateCategoryAction(), 
					{
					}
			)
		}
    }

}



/******* S.D.G. *******/



