/********************************************************************************
 * generated by de.acegen
 ********************************************************************************/




import AsynchronousCommand from "../../ace/AsynchronousCommand";
import Event from "../../ace/Event";
import * as AppUtils from "../../../src/AppUtils";
import * as AppState from "../../../src/AppState";
import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";

export default class AbstractClearDoneCommand extends AsynchronousCommand {
    constructor() {
        super("todo.ClearDoneCommand");
    }
    
    initCommandData(data) {
        data.categoryId = AppState.get(
        	["container", "footer", "categoryId"]
        )
        ;
        data.outcomes = [];
    }

	addOkOutcome(data) {
		data.outcomes.push("ok");
	}

	execute(data) {
	    return new Promise((resolve, reject) => {
			AppUtils.httpDelete(
					`${AppUtils.settings.rootPath}/todos/clear-done?${data.categoryId ? `categoryId=${data.categoryId}` : ""}`, 
					data.uuid, 
					false)
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
				events.push(new Event('todo.ClearDoneOkEvent'));
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



