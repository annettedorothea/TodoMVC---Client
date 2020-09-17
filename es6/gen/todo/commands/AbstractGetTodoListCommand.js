/********************************************************************************
 * generated by de.acegen 0.9.10
 ********************************************************************************/




import AbstractAsynchronousCommand from "../../../gen/ace/AbstractAsynchronousCommand";
import TriggerAction from "../../../gen/ace/TriggerAction";
import Utils from "../../ace/Utils";
import ACEController from "../../ace/ACEController";
import * as AppState from "../../ace/AppState";
import GetTodoListOkEvent from "../../../gen/todo/events/GetTodoListOkEvent";

export default class AbstractGetTodoListCommand extends AbstractAsynchronousCommand {
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
	
			this.doHttpGet(`/${Utils.getRootPath()}/todos/all`, false).then((data) => {
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



