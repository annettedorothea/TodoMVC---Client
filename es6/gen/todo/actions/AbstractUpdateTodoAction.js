import Action from "../../ace/Action";
import UpdateTodoCommand from "../../../src/todo/commands/UpdateTodoCommand";
import CommonView from "../../../src/todo/views/CommonView";

export default class AbstractUpdateTodoAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'todo.UpdateTodoAction', false);
    }

	getCommand() {
			return new UpdateTodoCommand(this.actionData);
	}

	
    preUpdateUI() {
		CommonView.block(this.actionParam);
    }

    postUpdateUI() {
		CommonView.unblock(this.actionParam);
    }

}

/*       S.D.G.       */
