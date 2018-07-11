import Command from "../../../gen/ace/SynchronousCommand";
import TriggerAction from "../../../gen/ace/TriggerAction";
import NewTodoChangedOkEvent from "../../../src/todo/events/NewTodoChangedOkEvent";

export default class AbstractNewTodoChangedCommand extends Command {
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

/*       S.D.G.       */
