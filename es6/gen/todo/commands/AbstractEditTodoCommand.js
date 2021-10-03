/********************************************************************************
 * generated by de.acegen 1.5.6
 ********************************************************************************/




import SynchronousCommand from "../../ace/SynchronousCommand";
import Event from "../../ace/Event";
import * as AppUtils from "../../../src/app/AppUtils";

export default class AbstractEditTodoCommand extends SynchronousCommand {
    constructor() {
        super("todo.EditTodoCommand");
    }

    initCommandData(data) {
        data.todoList = AppUtils.get(
        	["container", "todos", "todoList"]
        );
        data.outcomes = [];
    }

	addOkOutcome(data) {
		data.outcomes.push("ok");
	}

    publishEvents(data) {
		if (data.outcomes.includes("ok")) {
			new Event('todo.EditTodoOkEvent').publish(data);
			AppUtils.stateUpdated();
		}
    }
}




/******* S.D.G. *******/



