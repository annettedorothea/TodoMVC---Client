/********************************************************************************
 * generated by de.acegen
 ********************************************************************************/




import AsynchronousCommand from "../../ace/AsynchronousCommand";
import Event from "../../ace/Event";
import * as AppUtils from "../../../src/AppUtils";
import * as AppState from "../../../src/AppState";
import CreateCategoryAction from "../../../src/todo/actions/CreateCategoryAction";

export default class AbstractGetTodoListCommand extends AsynchronousCommand {
    constructor() {
        super("todo.GetTodoListCommand");
    }
    
    initCommandData(data) {
        data.categoryId = AppState.getLocation(
        	["container", "footer", "filter", "categoryId"]
        )
        ;
        data.filter = AppState.getLocation(
        	["container", "footer", "filter", "value"]
        )
        ;
        data.lastTodoList = AppState.get(
        	["container", "todos", "todoList"]
        )
        ;
        data.outcomes = [];
    }

	addOkOutcome(data) {
		data.outcomes.push("ok");
	}
	addCategoryDoesNotExistOutcome(data) {
		data.outcomes.push("categoryDoesNotExist");
	}
	
	allMandatoryValuesAreSet(data) {
		return true;
	}

	execute(data) {
	    return new Promise((resolve, reject) => {
	    	if (this.allMandatoryValuesAreSet(data)) {
				AppUtils.httpGet(
						`${AppUtils.settings.rootPath}/todos/all?${data.categoryId ? `categoryId=${data.categoryId}` : ""}`, 
						data.uuid, 
						false)
					.then((response) => {
						data.todoList = response.todoList;
						this.handleResponse(data, resolve, reject);
					}, (error) => {
						data.error = error;
						this.handleError(data, resolve, reject);
					})
					.catch(x => reject(x));
			} else {
				resolve(data);
			}
	    });
	}
	
	publishEvents(data) {
		return new Promise((resolve) => {
			const events = [];
			const actionsToBeTriggered = [];
			if (data.outcomes.includes("ok")) {
				events.push(new Event('todo.GetTodoListOkEvent'));
			}
			if (data.outcomes.includes("categoryDoesNotExist")) {
				events.push(new Event('todo.GetTodoListCategoryDoesNotExistEvent'));
				actionsToBeTriggered.push(
					{
						action: new CreateCategoryAction(), 
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



