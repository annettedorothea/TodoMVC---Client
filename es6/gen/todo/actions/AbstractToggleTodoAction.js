import Action from "../../ace/AsynchronousAction";
import ToggleTodoCommand from "../../../src/todo/commands/ToggleTodoCommand";
import CommonView from "../../../src/todo/views/CommonView";

export default class AbstractToggleTodoAction extends Action {

    constructor(actionData) {
        super(actionData, 'todo.ToggleTodoAction');
		this.postCall = this.postCall.bind(this);
    }

	getCommand() {
		return new ToggleTodoCommand(this.actionData);
	}

		preCall() {
			CommonView.block(this.actionData);
		}
	
		postCall() {
			CommonView.unblock(this.actionData);
		}

}

/*       S.D.G.       */
