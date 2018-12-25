import Command from "../../../gen/ace/AsynchronousCommand";
import TriggerAction from "../../../gen/ace/TriggerAction";
import NewTodoChangedAction from "../../../src/todo/actions/NewTodoChangedAction";
import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";

export default class AbstractCreateTodoCommand extends Command {
    constructor(commandData) {
        super(commandData, "todo.CreateTodoCommand");
        this.ok = "ok";
        this.empty = "empty";
    }

    publishEvents() {
		let promises = [];
	    	
		switch (this.commandData.outcome) {
		case this.ok:
			promises.push(new TriggerAction(new NewTodoChangedAction(this.commandData)).publish());
			promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
			break;
		case this.empty:
			break;
		default:
			return new Promise((resolve, reject) => {reject('CreateTodoCommand unhandled outcome: ' + this.commandData.outcome)});
		}
		return Promise.all(promises);
    }
    
	execute() {
	    return new Promise((resolve, reject) => {
	    	let queryParams = [];
			this.httpPost("/api/todos/create", false, queryParams, this.commandData).then((data) => {
				this.handleResponse(data);
			    resolve();
			}, (error) => {
			    reject(error);
			});
	    });
	}

}

/*       S.D.G.       */
