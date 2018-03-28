import Command from "../../../gen/ace/Command";
import TriggerAction from "../../../gen/ace/TriggerAction";
import ToggleTodoOkEvent from "../../../src/todo/events/ToggleTodoOkEvent";
import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";

export default class AbstractToggleTodoCommand extends Command {
    constructor(commandParam) {
        super(commandParam, "todo.ToggleTodoCommand");
        this.ok = "ok";
    }

    publishEvents() {
		let promises = [];
	    	
		switch (this.commandData.outcome) {
		case this.ok:
			promises.push(new ToggleTodoOkEvent(this.commandData).publish());
			promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
			break;
		default:
			return new Promise((resolve, reject) => {reject('ToggleTodoCommand unhandled outcome: ' + this.commandData.outcome)});
		}
		return Promise.all(promises);
    }
}

/*       S.D.G.       */
