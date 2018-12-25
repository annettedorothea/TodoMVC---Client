import Command from "../../../gen/ace/AsynchronousCommand";
import TriggerAction from "../../../gen/ace/TriggerAction";
import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";

export default class AbstractUpdateTodoCommand extends Command {
    constructor(commandData) {
        super(commandData, "todo.UpdateTodoCommand");
        this.ok = "ok";
        this.empty = "empty";
    }

    publishEvents() {
		let promises = [];
	    	
		switch (this.commandData.outcome) {
		case this.ok:
			promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
			break;
		case this.empty:
			break;
		default:
			return new Promise((resolve, reject) => {reject('UpdateTodoCommand unhandled outcome: ' + this.commandData.outcome)});
		}
		return Promise.all(promises);
    }
    
	execute() {
	    return new Promise((resolve, reject) => {
	    	let queryParams = [];
			this.httpPut("/api/todos/update", false, queryParams, this.commandData).then((data) => {
				this.handleResponse(data);
			    resolve();
			}, (error) => {
			    reject(error);
			});
	    });
	}

}

/*       S.D.G.       */
