import Command from "../../../gen/ace/Command";
import TriggerAction from "../../../gen/ace/TriggerAction";
import ToggleAllOkEvent from "../../../src/todo/events/ToggleAllOkEvent";
import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";

export default class AbstractToggleAllCommand extends Command {
    constructor(commandParam) {
        super(commandParam, "todo.ToggleAllCommand");
        this.ok = "ok";
    }

    publishEvents() {
		let promises = [];
	    	
		switch (this.commandData.outcome) {
		case this.ok:
			promises.push(new ToggleAllOkEvent(this.commandData).publish());
			promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
			break;
		default:
			return new Promise((resolve, reject) => {reject('ToggleAllCommand unhandled outcome: ' + this.commandData.outcome)});
		}
		return Promise.all(promises);
    }
}

/*       S.D.G.       */
