import Command from "../../../gen/ace/AsynchronousCommand";
import TriggerAction from "../../../gen/ace/TriggerAction";
import GetTodoListOkEvent from "../../../gen/todo/events/GetTodoListOkEvent";

export default class AbstractGetTodoListCommand extends Command {
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
			let queryParams = [];
	        
			this.httpGet(this.adjustedUrl(`/api/todos/all`), false, queryParams).then((data) => {
				this.commandData.todoList = data.todoList;
				this.handleResponse(resolve, reject);
			}, (error) => {
				this.commandData.error = error;
				this.handleError(resolve, reject);
			});
	    });
	}

}

/*       S.D.G.       */
