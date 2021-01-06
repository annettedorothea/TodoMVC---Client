/********************************************************************************
 * generated by de.acegen 1.1.0
 ********************************************************************************/




import SynchronousCommand from "../../../gen/ace/SynchronousCommand";
import NewTodoChangedOkEvent from "../../../gen/todo/events/NewTodoChangedOkEvent";

export default class AbstractNewTodoChangedCommand extends SynchronousCommand {
    constructor(commandData) {
        super(commandData, "todo.NewTodoChangedCommand");
        this.commandData.outcomes = [];
    }

	addOkOutcome() {
		this.commandData.outcomes.push("ok");
	}

    publishEvents() {
		if (this.commandData.outcomes.includes("ok")) {
			new NewTodoChangedOkEvent(this.commandData).publish();
		}
    }
}




/******* S.D.G. *******/



