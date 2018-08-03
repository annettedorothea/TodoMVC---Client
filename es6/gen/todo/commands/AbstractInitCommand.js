import Command from "../../../gen/ace/SynchronousCommand";
import TriggerAction from "../../../gen/ace/TriggerAction";
import InitAllEvent from "../../../gen/todo/events/InitAllEvent";
import InitDoneEvent from "../../../gen/todo/events/InitDoneEvent";
import InitOpenEvent from "../../../gen/todo/events/InitOpenEvent";
import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";

export default class AbstractInitCommand extends Command {
    constructor(commandData) {
        super(commandData, "todo.InitCommand");
        this.all = "all";
        this.done = "done";
        this.open = "open";
    }

    publishEvents() {
		switch (this.commandData.outcome) {
		case this.all:
			new InitAllEvent(this.commandData).publish();
			new TriggerAction(new GetTodoListAction(this.commandData)).publish();
			break;
		case this.done:
			new InitDoneEvent(this.commandData).publish();
			new TriggerAction(new GetTodoListAction(this.commandData)).publish();
			break;
		case this.open:
			new InitOpenEvent(this.commandData).publish();
			new TriggerAction(new GetTodoListAction(this.commandData)).publish();
			break;
		default:
			throw 'InitCommand unhandled outcome: ' + this.commandData.outcome;
		}
    }
}

/*       S.D.G.       */
