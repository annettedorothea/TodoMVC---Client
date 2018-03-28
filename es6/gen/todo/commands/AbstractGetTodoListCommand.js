import Command from "../../../gen/ace/Command";
import TriggerAction from "../../../gen/ace/TriggerAction";
import GetTodoListOkEvent from "../../../src/todo/events/GetTodoListOkEvent";

export default class AbstractGetTodoListCommand extends Command {
    constructor(commandParam) {
        super(commandParam, "todo.GetTodoListCommand");
        this.ok = "ok";
    }

    publishEvents() {
		let promises = [];
	    	
		switch (this.commandData.outcome) {
		case this.ok:
			promises.push(new GetTodoListOkEvent(this.commandData).publish());
			break;
		default:
			return new Promise((resolve, reject) => {reject('GetTodoListCommand unhandled outcome: ' + this.commandData.outcome)});
		}
		return Promise.all(promises);
    }
}

/*       S.D.G.       */
