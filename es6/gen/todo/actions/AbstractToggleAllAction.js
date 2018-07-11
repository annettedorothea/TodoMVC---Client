import Action from "../../ace/AsynchronousAction";
import ToggleAllCommand from "../../../src/todo/commands/ToggleAllCommand";
import CommonView from "../../../src/todo/views/CommonView";

export default class AbstractToggleAllAction extends Action {

    constructor(actionData) {
        super(actionData, 'todo.ToggleAllAction');
		this.postUpdateUI = this.postUpdateUI.bind(this);
    }

	getCommand() {
		return new ToggleAllCommand(this.actionData);
	}

		preUpdateUI() {
			CommonView.block(this.actionData);
		}
	
		postUpdateUI() {
			CommonView.unblock(this.actionData);
		}

}

/*       S.D.G.       */
