import Action from "../../ace/AsynchronousAction";
import ToggleAllCommand from "../../../src/todo/commands/ToggleAllCommand";
import CommonView from "../../../src/todo/views/CommonView";

export default class AbstractToggleAllAction extends Action {

    constructor(actionData) {
        super(actionData, 'todo.ToggleAllAction');
		this.postCall = this.postCall.bind(this);
    }

	getCommand() {
		return new ToggleAllCommand(this.actionData);
	}

		preCall() {
			CommonView.block(this.actionData);
		}
	
		postCall() {
			CommonView.unblock(this.actionData);
		}

}

/*       S.D.G.       */
