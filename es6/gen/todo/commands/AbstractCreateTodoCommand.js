/********************************************************************************
 * generated by de.acegen
 ********************************************************************************/




import AsynchronousCommand from "../../ace/AsynchronousCommand";
import Event from "../../ace/Event";
import * as AppUtils from "../../../src/AppUtils";
import * as AppState from "../../../src/AppState";
import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";

export default class AbstractCreateTodoCommand extends AsynchronousCommand {
    constructor() {
        super("todo.CreateTodoCommand");
    }
    
    initCommandData(data) {
        data.description = AppState.get(
        	["container", "newTodoInput", "newTodo"]
        )
        ;
        data.categoryId = AppState.get(
        	["container", "footer", "categoryId"]
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
	    		description : data.description,
	    		categoryId : data.categoryId
	    	};
			AppUtils.httpPost(
					`${AppUtils.settings.rootPath}/todos/create`, 
					data.uuid, 
					false,
					 payload).then(() => {
				this.handleResponse(data, resolve, reject);
			}, (error) => {
				data.error = error;
				this.handleError(data, resolve, reject);
			});
	    });
	}
	
	publishEvents(data) {
		return new Promise((resolve) => {
			const events = [];
			const actionsToBeTriggered = [];
			if (data.outcomes.includes("ok")) {
				events.push(new Event('todo.CreateTodoOkEvent'));
				actionsToBeTriggered.push(
					{
						action: new GetTodoListAction(), 
						data: {
						}
					}
				);
			}
			
			this.publish(events, data).then(() => {
		  		AppState.stateUpdated();
				this.trigger(actionsToBeTriggered).then(resolve);
			});
		})
	
	}


}



/******* S.D.G. *******/



