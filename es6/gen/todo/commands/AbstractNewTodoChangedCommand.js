/********************************************************************************
 * generated by de.acegen 0.9.10
 ********************************************************************************/




import AbstractSynchronousCommand from "../../../gen/ace/AbstractSynchronousCommand";
import TriggerAction from "../../../gen/ace/TriggerAction";
import * as AppState from "../../ace/AppState";
import NewTodoChangedOkEvent from "../../../gen/todo/events/NewTodoChangedOkEvent";

export default class AbstractNewTodoChangedCommand extends AbstractSynchronousCommand {
    constructor(commandData) {
        super(commandData, "todo.NewTodoChangedCommand");
        this.ok = "ok";
    }

    publishEvents() {
		switch (this.commandData.outcome) {
		case this.ok:
			new NewTodoChangedOkEvent(this.commandData).publish();
			break;
		default:
			throw 'NewTodoChangedCommand unhandled outcome: ' + this.commandData.outcome;
		}
    }
}




/******* S.D.G. *******/



