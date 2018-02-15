import Command from "../../../gen/ace/Command";
import TriggerAction from "../../../gen/ace/TriggerAction";
import EditTodoEvent from "../../../src/todo/events/EditTodoEvent";

export default class AbstractEditTodoCommand extends Command {
    constructor(commandParam) {
        super(commandParam, "todo.EditTodoCommand");
        this.ok = "ok";
    }

    publishEvents() {
		let promises = [];
	    	
		switch (this.commandData.outcome) {
		case this.ok:
			promises.push(new EditTodoEvent(this.commandData).publish());
			break;
		default:
			throw 'EditTodoCommand unhandled outcome: ' + this.commandData.outcome;
		}
		return Promise.all(promises);
    }
}

/*       S.D.G.       */
