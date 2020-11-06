/********************************************************************************
 * generated by de.acegen 1.0.2
 ********************************************************************************/




import AsynchronousCommand from "../../../gen/ace/AsynchronousCommand";
import Utils from "../../ace/Utils";
import AppUtils from "../../../src/app/AppUtils";
import GetTodoListOkEvent from "../../../gen/todo/events/GetTodoListOkEvent";

export default class AbstractGetTodoListCommand extends AsynchronousCommand {
    constructor(commandData) {
        super(commandData, "todo.GetTodoListCommand");
        this.ok = "ok";
    }

    publishEvents() {
		let promises = [];
	    	
		switch (this.commandData.outcome) {
		case this.ok:
			promises.push(new GetTodoListOkEvent(this.commandData).publish());
			break;
		default:
			return new Promise((resolve, reject) => {reject('GetTodoListCommand unhandled outcome: ' + this.commandData.outcome)});
		}
		return Promise.all(promises);
    }
    
	execute() {
	    return new Promise((resolve, reject) => {
	
			AppUtils.httpGet(`${Utils.settings.rootPath}/todos/all`, this.commandData.uuid, false).then((data) => {
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



