/********************************************************************************
 * generated by de.acegen 1.0.2
 ********************************************************************************/




import AsynchronousCommand from "../../../gen/ace/AsynchronousCommand";
import Utils from "../../ace/Utils";
import AppUtils from "../../../src/app/AppUtils";
import * as AppState from "../../ace/AppState";
import GetTodoListWithoutCategoryCheckOkEvent from "../../../gen/todo/events/GetTodoListWithoutCategoryCheckOkEvent";

export default class AbstractGetTodoListWithoutCategoryCheckCommand extends AsynchronousCommand {
    constructor(commandData) {
        super(commandData, "todo.GetTodoListWithoutCategoryCheckCommand");
        this.ok = "ok";
        this.commandData.categoryId = AppState.get_categoryId();
    }

    publishEvents() {
		let promises = [];
	    	
		switch (this.commandData.outcome) {
		case this.ok:
			promises.push(new GetTodoListWithoutCategoryCheckOkEvent(this.commandData).publish());
			break;
		default:
			return new Promise((resolve, reject) => {reject('GetTodoListWithoutCategoryCheckCommand unhandled outcome: ' + this.commandData.outcome)});
		}
		return Promise.all(promises);
    }
    
	execute() {
	    return new Promise((resolve, reject) => {
	
			AppUtils.httpGet(`${Utils.settings.rootPath}/todos/all?categoryId=${this.commandData.categoryId}`, this.commandData.uuid, false).then((data) => {
				this.commandData.todoList = data.todoList;
				this.handleResponse(resolve, reject);
			}, (error) => {
				this.commandData.error = error;
				this.handleError(resolve, reject);
			});
	    });
	}

}




/******* S.D.G. *******/



