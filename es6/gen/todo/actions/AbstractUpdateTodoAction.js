import Action from "../../ace/AsynchronousAction";
import UpdateTodoCommand from "../../../src/todo/commands/UpdateTodoCommand";
import CommonView from "../../../src/todo/views/CommonView";

export default class AbstractUpdateTodoAction extends Action {

    constructor(actionData) {
        super(actionData, 'todo.UpdateTodoAction');
		this.postCall = this.postCall.bind(this);
    }

	getCommand() {
		return new UpdateTodoCommand(this.actionData);
	}

		preCall() {
			CommonView.block(this.actionData);
		}
	
		postCall() {
			CommonView.unblock(this.actionData);
		}

}

/*       S.D.G.       */
