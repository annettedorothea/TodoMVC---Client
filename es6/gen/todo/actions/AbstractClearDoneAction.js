import Action from "../../ace/AsynchronousAction";
import ClearDoneCommand from "../../../src/todo/commands/ClearDoneCommand";
import CommonView from "../../../src/todo/views/CommonView";

export default class AbstractClearDoneAction extends Action {

    constructor(actionData) {
        super(actionData, 'todo.ClearDoneAction');
		this.postUpdateUI = this.postUpdateUI.bind(this);
    }

	getCommand() {
		return new ClearDoneCommand(this.actionData);
	}

		preUpdateUI() {
			CommonView.block(this.actionData);
		}
	
		postUpdateUI() {
			CommonView.unblock(this.actionData);
		}

}

/*       S.D.G.       */
