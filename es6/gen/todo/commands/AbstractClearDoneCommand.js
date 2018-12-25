import Command from "../../../gen/ace/AsynchronousCommand";
import TriggerAction from "../../../gen/ace/TriggerAction";
import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";

export default class AbstractClearDoneCommand extends Command {
    constructor(commandData) {
        super(commandData, "todo.ClearDoneCommand");
        this.ok = "ok";
    }

    publishEvents() {
		let promises = [];
	    	
		switch (this.commandData.outcome) {
		case this.ok:
			promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
			break;
		default:
			return new Promise((resolve, reject) => {reject('ClearDoneCommand unhandled outcome: ' + this.commandData.outcome)});
		}
		return Promise.all(promises);
    }
    
	execute() {
	    return new Promise((resolve, reject) => {
	    	let queryParams = [];
			this.httpDelete("/api/todos/clear-done", false, queryParams).then((data) => {
				this.handleResponse(data);
			    resolve();
			}, (error) => {
			    reject(error);
			});
	    });
	}

}

/*       S.D.G.       */
