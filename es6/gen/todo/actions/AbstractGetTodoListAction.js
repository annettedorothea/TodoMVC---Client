import Action from "../../ace/Action";
import GetTodoListCommand from "../../../src/todo/commands/GetTodoListCommand";
import CommonView from "../../../src/todo/views/CommonView";

export default class AbstractGetTodoListAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'todo.GetTodoListAction', false);
    }

	getCommand() {
		return new GetTodoListCommand(this.actionData);
	}

	preUpdateUI() {
		CommonView.block(this.actionParam);
	}

	postUpdateUI() {
		CommonView.unblock(this.actionParam);
	}

}

/*       S.D.G.       */
