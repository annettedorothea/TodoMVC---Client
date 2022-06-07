/********************************************************************************
 * generated by de.acegen
 ********************************************************************************/




import AsynchronousCommand from "../../ace/AsynchronousCommand";
import Event from "../../ace/Event";
import * as AppUtils from "../../../src/AppUtils";
import * as AppState from "../../../src/AppState";
import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";

export default class AbstractUpdateTodoCommand extends AsynchronousCommand {
    constructor() {
        super("todo.UpdateTodoCommand");
    }
    
    initCommandData(data) {
        data.todoList = AppState.get(
        	["container", "todos", "todoList"]
        )
        ;
        data.outcomes = [];
    }

	addOkOutcome(data) {
		data.outcomes.push("ok");
	}
	addEmptyOutcome(data) {
		data.outcomes.push("empty");
	}

	execute(data) {
	    return new Promise((resolve, reject) => {
	    	let payload = {
	    		id : data.id,
	    		description : data.description
	    	};
			AppUtils.httpPut(
					`${AppUtils.settings.rootPath}/todos/update`, 
					data.uuid, 
					false,
					 payload)
				.then(() => {
					this.handleResponse(data, resolve, reject);
				}, (error) => {
					data.error = error;
					this.handleError(data, resolve, reject);
				})
				.catch(x => reject(x));
	    });
	}
	
	publishEvents(data) {
		return new Promise((resolve) => {
			const events = [];
			const actionsToBeTriggered = [];
			if (data.outcomes.includes("ok")) {
				events.push(new Event('todo.UpdateTodoOkEvent'));
				actionsToBeTriggered.push(
					{
						action: new GetTodoListAction(), 
						data: {
						}
					}
				);
			}
			if (data.outcomes.includes("empty")) {
				events.push(new Event('todo.UpdateTodoEmptyEvent'));
			}
			
			this.publish(events, data).then(() => {
		  		AppState.stateUpdated();
				this.trigger(actionsToBeTriggered).then(resolve);
			});
		})
	
	}

}



/******* S.D.G. *******/



