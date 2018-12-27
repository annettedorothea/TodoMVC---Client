import Command from "../../../gen/ace/AsynchronousCommand";
import TriggerAction from "../../../gen/ace/TriggerAction";
import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";

export default class AbstractToggleAllCommand extends Command {
    constructor(commandData) {
        super(commandData, "todo.ToggleAllCommand");
        this.ok = "ok";
    }

    publishEvents() {
		let promises = [];
	    	
		switch (this.commandData.outcome) {
		case this.ok:
			promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
			break;
		default:
			return new Promise((resolve, reject) => {reject('ToggleAllCommand unhandled outcome: ' + this.commandData.outcome)});
		}
		return Promise.all(promises);
    }
    
	execute() {
	    return new Promise((resolve, reject) => {
	    	let queryParams = [];
			this.httpPut("/api/todos/toggle-all", false, queryParams, this.commandData).then((data) => {
				this.handleResponse(data);
			    resolve();
			}, (error) => {
			    reject(error);
			});
	    });
	}

}

/*       S.D.G.       */
