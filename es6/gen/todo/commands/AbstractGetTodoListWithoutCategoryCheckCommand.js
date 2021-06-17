/********************************************************************************
 * generated by de.acegen 1.3.0
 ********************************************************************************/




import AsynchronousCommand from "../../../gen/ace/AsynchronousCommand";
import Utils from "../../ace/Utils";
import AppUtils from "../../../src/app/AppUtils";
import * as AppState from "../../ace/AppState";
import GetTodoListWithoutCategoryCheckOkEvent from "../../../gen/todo/events/GetTodoListWithoutCategoryCheckOkEvent";

export default class AbstractGetTodoListWithoutCategoryCheckCommand extends AsynchronousCommand {
    constructor(commandData) {
        super(commandData, "todo.GetTodoListWithoutCategoryCheckCommand");
        this.commandData.categoryId = AppState.get_container_footer_categoryId();
        this.commandData.outcomes = [];
    }

	addOkOutcome() {
		this.commandData.outcomes.push("ok");
	}

    publishEvents() {
		let promises = [];
	    
		if (this.commandData.outcomes.includes("ok")) {
			promises.push(new GetTodoListWithoutCategoryCheckOkEvent(this.commandData).publish());
		}
		return Promise.all(promises);
    }
    
	execute() {
	    return new Promise((resolve, reject) => {
	
			AppUtils.httpGet(`${Utils.settings.rootPath}/todos/all?categoryId=${this.commandData.categoryId}`, this.commandData.uuid, false).then((data) => {
				this.commandData.todoList = data.todoList;
				this.handleResponse(resolve, reject);
			}, (message) => {
				this.commandData.message = message;
				this.handleError(resolve, reject);
			});
	    });
	}

}




/******* S.D.G. *******/


