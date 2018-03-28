import Command from "../../../gen/ace/Command";
import TriggerAction from "../../../gen/ace/TriggerAction";
import ClearDoneOkEvent from "../../../src/todo/events/ClearDoneOkEvent";
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
			promises.push(new ClearDoneOkEvent(this.commandData).publish());
			promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
			break;
		default:
			return new Promise((resolve, reject) => {reject('ClearDoneCommand unhandled outcome: ' + this.commandData.outcome)});
		}
		return Promise.all(promises);
    }
}

/*       S.D.G.       */
