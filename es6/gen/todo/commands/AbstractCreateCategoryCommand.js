/********************************************************************************
 * generated by de.acegen
 ********************************************************************************/




import AsynchronousCommand from "../../ace/AsynchronousCommand";
import Event from "../../ace/Event";
import * as AppUtils from "../../../src/AppUtils";
import * as AppState from "../../../src/AppState";
import GetTodoListWithoutCategoryCheckAction from "../../../src/todo/actions/GetTodoListWithoutCategoryCheckAction";

export default class AbstractCreateCategoryCommand extends AsynchronousCommand {
    constructor() {
        super("todo.CreateCategoryCommand");
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
	    	let payload = {
	    		categoryId : data.categoryId
	    	};
			AppUtils.httpPost(
					`${AppUtils.settings.rootPath}/category/create`, 
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
				events.push(new Event('todo.CreateCategoryOkEvent'));
				actionsToBeTriggered.push(
					{
						action: new GetTodoListWithoutCategoryCheckAction(), 
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



