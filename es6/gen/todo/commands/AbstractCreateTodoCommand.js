import Command from "../../../gen/ace/Command";
import TriggerAction from "../../../gen/ace/TriggerAction";
import CreateTodoOkEvent from "../../../src/todo/events/CreateTodoOkEvent";
import CreateTodoEmptyEvent from "../../../src/todo/events/CreateTodoEmptyEvent";
import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";

export default class AbstractCreateTodoCommand extends Command {
    constructor(commandParam) {
        super(commandParam, "todo.CreateTodoCommand");
        this.ok = "ok";
        this.empty = "empty";
    }

    publishEvents() {
		let promises = [];
	    	
		switch (this.commandData.outcome) {
		case this.ok:
			promises.push(new CreateTodoOkEvent(this.commandData).publish());
			promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
			break;
		case this.empty:
			promises.push(new CreateTodoEmptyEvent(this.commandData).publish());
			break;
		default:
			return new Promise((resolve, reject) => {reject('CreateTodoCommand unhandled outcome: ' + this.commandData.outcome)});
		}
		return Promise.all(promises);
    }
}

/*       S.D.G.       */
