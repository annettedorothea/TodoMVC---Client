import Action from "../../ace/Action";
import DeleteTodoCommand from "../../../src/todo/commands/DeleteTodoCommand";
import CommonView from "../../../src/todo/views/CommonView";

export default class AbstractDeleteTodoAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'todo.DeleteTodoAction', false);
    }

	getCommand() {
		return new DeleteTodoCommand(this.actionData);
	}

	preUpdateUI() {
		CommonView.block(this.actionParam);
	}

	postUpdateUI() {
		CommonView.unblock(this.actionParam);
	}

}

/*       S.D.G.       */
