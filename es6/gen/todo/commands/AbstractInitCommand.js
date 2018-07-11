import Command from "../../../gen/ace/SynchronousCommand";
import TriggerAction from "../../../gen/ace/TriggerAction";
import InitAllEvent from "../../../src/todo/events/InitAllEvent";
import InitDoneEvent from "../../../src/todo/events/InitDoneEvent";
import InitOpenEvent from "../../../src/todo/events/InitOpenEvent";
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
