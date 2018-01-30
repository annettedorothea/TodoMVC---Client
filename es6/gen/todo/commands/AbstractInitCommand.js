import Command from "../../../gen/ace/Command";
import TriggerAction from "../../../gen/ace/TriggerAction";
import InitFilterEvent from "../../../src/todo/events/InitFilterEvent";
import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";

export default class AbstractInitCommand extends Command {
    constructor(commandParam) {
        super(commandParam, "todo.InitCommand");
        this.all = "all";
        this.done = "done";
        this.open = "open";
    }

    publishEvents() {
		let promises = [];
	    	
		switch (this.commandData.outcome) {
		case this.all:
			promises.push(new InitFilterEvent(this.commandData).publish());
			promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
			break;
		case this.done:
			promises.push(new InitFilterEvent(this.commandData).publish());
			promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
			break;
		case this.open:
			promises.push(new InitFilterEvent(this.commandData).publish());
			promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
			break;
		default:
			throw 'unhandled outcome: ' + this.commandData.outcome;
		}
		return Promise.all(promises);
    }
}

/*       S.D.G.       */
