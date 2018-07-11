import Action from "../../ace/AsynchronousAction";
import CreateTodoCommand from "../../../src/todo/commands/CreateTodoCommand";
import CommonView from "../../../src/todo/views/CommonView";

export default class AbstractCreateTodoAction extends Action {

    constructor(actionData) {
        super(actionData, 'todo.CreateTodoAction');
		this.postUpdateUI = this.postUpdateUI.bind(this);
    }

	getCommand() {
		return new CreateTodoCommand(this.actionData);
	}

		preUpdateUI() {
			CommonView.block(this.actionData);
		}
	
		postUpdateUI() {
			CommonView.unblock(this.actionData);
		}

}

/*       S.D.G.       */
