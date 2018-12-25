import Action from "../../ace/AsynchronousAction";
import ClearDoneCommand from "../../../src/todo/commands/ClearDoneCommand";
import CommonView from "../../../src/todo/views/CommonView";

export default class AbstractClearDoneAction extends Action {

    constructor(actionData) {
        super(actionData, 'todo.ClearDoneAction');
		this.postCall = this.postCall.bind(this);
    }

	getCommand() {
		return new ClearDoneCommand(this.actionData);
	}

		preCall() {
			CommonView.block(this.actionData);
		}
	
		postCall() {
			CommonView.unblock(this.actionData);
		}

}

/*       S.D.G.       */
