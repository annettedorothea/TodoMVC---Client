import Command from "../../../gen/ace/Command";
import TriggerAction from "../../../gen/ace/TriggerAction";
import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";

export default class AbstractClearDoneCommand extends Command {
    constructor(commandParam) {
        super(commandParam, "todo.ClearDoneCommand");
        this.ok = "ok";
    }

    publishEvents() {
		let promises = [];
	    	
		switch (this.commandData.outcome) {
		case this.ok:
			promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
			break;
		default:
			throw 'ClearDoneCommand unhandled outcome: ' + this.commandData.outcome;
		}
		return Promise.all(promises);
    }
}

/*       S.D.G.       */
