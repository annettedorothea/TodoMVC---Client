import Command from "../../../gen/ace/AsynchronousCommand";
import TriggerAction from "../../../gen/ace/TriggerAction";
import UpdateTodoOkEvent from "../../../gen/todo/events/UpdateTodoOkEvent";
import UpdateTodoEmptyEvent from "../../../gen/todo/events/UpdateTodoEmptyEvent";
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
			promises.push(new UpdateTodoOkEvent(this.commandData).publish());
			promises.push(new TriggerAction(new GetTodoListAction()).publish());
			break;
		case this.empty:
			promises.push(new UpdateTodoEmptyEvent(this.commandData).publish());
			break;
		default:
			return new Promise((resolve, reject) => {reject('UpdateTodoCommand unhandled outcome: ' + this.commandData.outcome)});
		}
		return Promise.all(promises);
    }
    
	execute() {
	    return new Promise((resolve, reject) => {
			let queryParams = [];
	        let payload = {	
	        	id : this.commandData.id,
	        	description : this.commandData.description,
	        	};

			this.httpPut(this.adjustedUrl(`/api/todos/update`), false, queryParams, payload).then((data) => {
				this.handleResponse(resolve, reject);
			}, (error) => {
				this.commandData.error = error;
				this.handleError(resolve, reject);
			});
	    });
	}

}

/*       S.D.G.       */
