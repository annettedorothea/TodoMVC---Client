import Action from "../../ace/Action";
import CreateTodoCommand from "../../../src/todo/commands/CreateTodoCommand";
import CommonView from "../../../src/todo/views/CommonView";

export default class AbstractCreateTodoAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'todo.CreateTodoAction', false);
    }

	getCommand() {
			return new CreateTodoCommand(this.actionData);
	}

	
    preUpdateUI() {
		CommonView.block(this.actionParam);
    }

    postUpdateUI() {
		CommonView.unblock(this.actionParam);
    }

}

/*       S.D.G.       */
