import Command from "../../../gen/ace/Command";
import TriggerAction from "../../../gen/ace/TriggerAction";
import RenderListEvent from "../../../src/todo/events/RenderListEvent";

export default class AbstractGetTodoListCommand extends Command {
    constructor(commandParam) {
        super(commandParam, "todo.GetTodoListCommand");
        this.ok = "ok";
        this.error = "error";
    }

    publishEvents() {
		let promises = [];
	    	
		switch (this.commandData.outcome) {
		case this.ok:
			promises.push(new RenderListEvent(this.commandData).publish());
			break;
		case this.error:
			break;
		default:
			throw 'unhandled outcome: ' + this.commandData.outcome;
		}
		return Promise.all(promises);
    }
}

/*       S.D.G.       */
