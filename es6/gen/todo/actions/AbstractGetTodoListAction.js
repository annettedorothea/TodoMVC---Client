import Action from "../../ace/AsynchronousAction";
import GetTodoListCommand from "../../../src/todo/commands/GetTodoListCommand";
import CommonView from "../../../src/todo/views/CommonView";

export default class AbstractGetTodoListAction extends Action {

    constructor(actionData) {
        super(actionData, 'todo.GetTodoListAction');
		this.postCall = this.postCall.bind(this);
    }

	getCommand() {
		return new GetTodoListCommand(this.actionData);
	}

		preCall() {
			CommonView.block(this.actionData);
		}
	
		postCall() {
			CommonView.unblock(this.actionData);
		}

}

/*       S.D.G.       */
