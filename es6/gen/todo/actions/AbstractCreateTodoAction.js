import Action from "../../ace/AsynchronousAction";
import CreateTodoCommand from "../../../src/todo/commands/CreateTodoCommand";
import CommonView from "../../../src/todo/views/CommonView";

export default class AbstractCreateTodoAction extends Action {

    constructor(actionData) {
        super(actionData, 'todo.CreateTodoAction');
		this.postCall = this.postCall.bind(this);
    }

	getCommand() {
		return new CreateTodoCommand(this.actionData);
	}

		preCall() {
			CommonView.block(this.actionData);
		}
	
		postCall() {
			CommonView.unblock(this.actionData);
		}

}

/*       S.D.G.       */
