import Action from "../../ace/SynchronousAction";
import EditTodoCommand from "../../../src/todo/commands/EditTodoCommand";

export default class AbstractEditTodoAction extends Action {

    constructor(actionData) {
        super(actionData, 'todo.EditTodoAction');
    }

	getCommand() {
		return new EditTodoCommand(this.actionData);
	}


}

/*       S.D.G.       */
