/********************************************************************************
 * generated by de.acegen 1.5.4
 ********************************************************************************/




import AsynchronousCommand from "../../ace/AsynchronousCommand";
import TriggerAction from "../../ace/TriggerAction";
import * as AppUtils from "../../../src/app/AppUtils";
import GetTodoListWithoutCategoryCheckAction from "../../../src/todo/actions/GetTodoListWithoutCategoryCheckAction";

export default class AbstractCreateCategoryCommand extends AsynchronousCommand {
    constructor() {
        super("todo.CreateCategoryCommand");
    }
    
    initCommandData(data) {
        data.categoryId = AppUtils.get(
        	["container", "footer", "categoryId"]
        );
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
			AppUtils.httpPost(`${AppUtils.settings.rootPath}/category/create`, data.uuid, false, payload).then(() => {
				this.handleResponse(data, resolve, reject);
			}, (error) => {
				data.error = error;
				this.handleError(data, resolve, reject);
			});
	    });
	}

    publishEvents(data) {
		if (data.outcomes.includes("ok")) {
			new TriggerAction().publish(
				new GetTodoListWithoutCategoryCheckAction(), 
					{
					}
			)
		}
    }

}



/******* S.D.G. *******/



