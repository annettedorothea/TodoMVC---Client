import Action from "../../ace/AsynchronousAction";
import DeleteTodoCommand from "../../../src/todo/commands/DeleteTodoCommand";
import CommonView from "../../../src/todo/views/CommonView";

export default class AbstractDeleteTodoAction extends Action {

    constructor(actionData) {
        super(actionData, 'todo.DeleteTodoAction');
		this.postCall = this.postCall.bind(this);
    }

	getCommand() {
		return new DeleteTodoCommand(this.actionData);
	}

		preCall() {
			CommonView.block(this.actionData);
		}
	
		postCall() {
			CommonView.unblock(this.actionData);
		}

}

/*       S.D.G.       */
