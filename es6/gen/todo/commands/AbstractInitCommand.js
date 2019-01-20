import Command from "../../../gen/ace/SynchronousCommand";
import TriggerAction from "../../../gen/ace/TriggerAction";
import InitOkEvent from "../../../gen/todo/events/InitOkEvent";
import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";

export default class AbstractInitCommand extends Command {
    constructor(commandData) {
        super(commandData, "todo.InitCommand");
        this.ok = "ok";
    }

    publishEvents() {
		switch (this.commandData.outcome) {
		case this.ok:
			new InitOkEvent(this.commandData).publish();
			new TriggerAction(new GetTodoListAction()).publish();
			break;
		default:
			throw 'InitCommand unhandled outcome: ' + this.commandData.outcome;
		}
    }
}

/*       S.D.G.       */
