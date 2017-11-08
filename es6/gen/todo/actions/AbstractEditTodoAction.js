import Action from "../../ace/Action";
import EditTodoCommand from "../../../src/todo/commands/EditTodoCommand";

export default class AbstractEditTodoAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'todo.EditTodoAction', false);
    }

	getCommand() {
			return new EditTodoCommand(this.actionData);
	}

}

/*       S.D.G.       */
