import Command from "../../../gen/ace/Command";
import TriggerAction from "../../../gen/ace/TriggerAction";
import UpdateTodoOkEvent from "../../../src/todo/events/UpdateTodoOkEvent";
import UpdateTodoEmptyEvent from "../../../src/todo/events/UpdateTodoEmptyEvent";
import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";

export default class AbstractUpdateTodoCommand extends Command {
    constructor(commandParam) {
        super(commandParam, "todo.UpdateTodoCommand");
        this.ok = "ok";
        this.empty = "empty";
    }

    publishEvents() {
		let promises = [];
	    	
		switch (this.commandData.outcome) {
		case this.ok:
			promises.push(new UpdateTodoOkEvent(this.commandData).publish());
			promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
			break;
		case this.empty:
			promises.push(new UpdateTodoEmptyEvent(this.commandData).publish());
			break;
		default:
			return new Promise((resolve, reject) => {reject('UpdateTodoCommand unhandled outcome: ' + this.commandData.outcome)});
		}
		return Promise.all(promises);
    }
}

/*       S.D.G.       */
