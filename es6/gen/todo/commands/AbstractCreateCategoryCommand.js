/********************************************************************************
 * generated by de.acegen 1.2.1
 ********************************************************************************/




import AsynchronousCommand from "../../../gen/ace/AsynchronousCommand";
import TriggerAction from "../../../gen/ace/TriggerAction";
import Utils from "../../ace/Utils";
import AppUtils from "../../../src/app/AppUtils";
import * as AppState from "../../ace/AppState";
import GetTodoListWithoutCategoryCheckAction from "../../../src/todo/actions/GetTodoListWithoutCategoryCheckAction";

export default class AbstractCreateCategoryCommand extends AsynchronousCommand {
    constructor(commandData) {
        super(commandData, "todo.CreateCategoryCommand");
        this.commandData.categoryId = AppState.get_container_footer_categoryId();
        this.commandData.outcomes = [];
    }

	addOkOutcome() {
		this.commandData.outcomes.push("ok");
	}

    publishEvents() {
		let promises = [];
	    
		if (this.commandData.outcomes.includes("ok")) {
			promises.push(new TriggerAction(new GetTodoListWithoutCategoryCheckAction()).publish());
		}
		return Promise.all(promises);
    }
    
	execute() {
	    return new Promise((resolve, reject) => {
	    	let payload = {
	    		categoryId : this.commandData.categoryId
	    	};
	
			AppUtils.httpPost(`${Utils.settings.rootPath}/category/create`, this.commandData.uuid, false, payload).then(() => {
				this.handleResponse(resolve, reject);
			}, (message) => {
				this.commandData.message = message;
				this.handleError(resolve, reject);
			});
	    });
	}

}




/******* S.D.G. *******/



