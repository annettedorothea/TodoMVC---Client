import Action from "../../ace/Action";
import UpdateTodoCommand from "../../../src/todo/commands/UpdateTodoCommand";

export default class AbstractUpdateTodoAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'todo.UpdateTodoAction', false);
    }

	getCommand() {
			return new UpdateTodoCommand(this.actionData);
	}

}

/*       S.D.G.       */
