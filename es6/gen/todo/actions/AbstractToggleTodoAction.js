import Action from "../../ace/AsynchronousAction";
import ToggleTodoCommand from "../../../src/todo/commands/ToggleTodoCommand";
import CommonView from "../../../src/todo/views/CommonView";

export default class AbstractToggleTodoAction extends Action {

    constructor(actionData) {
        super(actionData, 'todo.ToggleTodoAction');
		this.postUpdateUI = this.postUpdateUI.bind(this);
    }

	getCommand() {
		return new ToggleTodoCommand(this.actionData);
	}

		preUpdateUI() {
			CommonView.block(this.actionData);
		}
	
		postUpdateUI() {
			CommonView.unblock(this.actionData);
		}

}

/*       S.D.G.       */
