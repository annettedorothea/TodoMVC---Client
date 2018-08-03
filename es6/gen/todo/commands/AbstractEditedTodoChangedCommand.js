import Command from "../../../gen/ace/SynchronousCommand";
import TriggerAction from "../../../gen/ace/TriggerAction";
import EditedTodoChangedOkEvent from "../../../gen/todo/events/EditedTodoChangedOkEvent";

export default class AbstractEditedTodoChangedCommand extends Command {
    constructor(commandData) {
        super(commandData, "todo.EditedTodoChangedCommand");
        this.ok = "ok";
    }

    publishEvents() {
		switch (this.commandData.outcome) {
		case this.ok:
			new EditedTodoChangedOkEvent(this.commandData).publish();
			break;
		default:
			throw 'EditedTodoChangedCommand unhandled outcome: ' + this.commandData.outcome;
		}
    }
}

/*       S.D.G.       */
