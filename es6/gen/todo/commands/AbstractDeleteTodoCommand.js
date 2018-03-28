import Command from "../../../gen/ace/Command";
import TriggerAction from "../../../gen/ace/TriggerAction";
import DeleteTodoOkEvent from "../../../src/todo/events/DeleteTodoOkEvent";
import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";

export default class AbstractDeleteTodoCommand extends Command {
    constructor(commandParam) {
        super(commandParam, "todo.DeleteTodoCommand");
        this.ok = "ok";
    }

    publishEvents() {
		let promises = [];
	    	
		switch (this.commandData.outcome) {
		case this.ok:
			promises.push(new DeleteTodoOkEvent(this.commandData).publish());
			promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
			break;
		default:
			return new Promise((resolve, reject) => {reject('DeleteTodoCommand unhandled outcome: ' + this.commandData.outcome)});
		}
		return Promise.all(promises);
    }
}

/*       S.D.G.       */
