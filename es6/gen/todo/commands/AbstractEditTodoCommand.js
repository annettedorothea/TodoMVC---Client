import Command from "../../../gen/ace/SynchronousCommand";
import TriggerAction from "../../../gen/ace/TriggerAction";
import EditTodoOkEvent from "../../../gen/todo/events/EditTodoOkEvent";

export default class AbstractEditTodoCommand extends Command {
    constructor(commandData) {
        super(commandData, "todo.EditTodoCommand");
        this.ok = "ok";
    }

    publishEvents() {
		switch (this.commandData.outcome) {
		case this.ok:
			new EditTodoOkEvent(this.commandData).publish();
			break;
		default:
			throw 'EditTodoCommand unhandled outcome: ' + this.commandData.outcome;
		}
    }
}

/*       S.D.G.       */
