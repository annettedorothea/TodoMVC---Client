import Command from "../../../gen/ace/Command";
import TriggerAction from "../../../gen/ace/TriggerAction";
import EditTodoOkEvent from "../../../src/todo/events/EditTodoOkEvent";

export default class AbstractEditTodoCommand extends Command {
    constructor(commandParam) {
        super(commandParam, "todo.EditTodoCommand");
        this.ok = "ok";
    }

    publishEvents() {
		let promises = [];
	    	
		switch (this.commandData.outcome) {
		case this.ok:
			promises.push(new EditTodoOkEvent(this.commandData).publish());
			break;
		default:
			return new Promise((resolve, reject) => {reject('EditTodoCommand unhandled outcome: ' + this.commandData.outcome)});
		}
		return Promise.all(promises);
    }
}

/*       S.D.G.       */
