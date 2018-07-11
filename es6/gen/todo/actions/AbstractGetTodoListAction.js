import Action from "../../ace/AsynchronousAction";
import GetTodoListCommand from "../../../src/todo/commands/GetTodoListCommand";
import CommonView from "../../../src/todo/views/CommonView";

export default class AbstractGetTodoListAction extends Action {

    constructor(actionData) {
        super(actionData, 'todo.GetTodoListAction');
		this.postUpdateUI = this.postUpdateUI.bind(this);
    }

	getCommand() {
		return new GetTodoListCommand(this.actionData);
	}

		preUpdateUI() {
			CommonView.block(this.actionData);
		}
	
		postUpdateUI() {
			CommonView.unblock(this.actionData);
		}

}

/*       S.D.G.       */
