/********************************************************************************
 * generated by de.acegen 1.2.1
 ********************************************************************************/




import SynchronousCommand from "../../../gen/ace/SynchronousCommand";
import * as AppState from "../../ace/AppState";
import EditTodoOkEvent from "../../../gen/todo/events/EditTodoOkEvent";

export default class AbstractEditTodoCommand extends SynchronousCommand {
    constructor(commandData) {
        super(commandData, "todo.EditTodoCommand");
        this.commandData.outcomes = [];
        this.commandData.todoList = AppState.get_container_todos_todoList();
    }

	addOkOutcome() {
		this.commandData.outcomes.push("ok");
	}

    publishEvents() {
		if (this.commandData.outcomes.includes("ok")) {
			new EditTodoOkEvent(this.commandData).publish();
		}
    }
}




/******* S.D.G. *******/



