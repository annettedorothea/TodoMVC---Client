import Action from "../../ace/AsynchronousAction";
import DeleteTodoCommand from "../../../src/todo/commands/DeleteTodoCommand";
import CommonView from "../../../src/todo/views/CommonView";

export default class AbstractDeleteTodoAction extends Action {

    constructor(actionData) {
        super(actionData, 'todo.DeleteTodoAction');
		this.postUpdateUI = this.postUpdateUI.bind(this);
    }

	getCommand() {
		return new DeleteTodoCommand(this.actionData);
	}

		preUpdateUI() {
			CommonView.block(this.actionData);
		}
	
		postUpdateUI() {
			CommonView.unblock(this.actionData);
		}

}

/*       S.D.G.       */
