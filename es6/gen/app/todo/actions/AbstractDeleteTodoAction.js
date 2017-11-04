import Action from "../../../ace/Action";
import DeleteTodoCommand from "../../../../src/todo/commands/DeleteTodoCommand";

export default class AbstractDeleteTodoAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'DeleteTodoAction', false);
    }

	getCommand() {
			return new DeleteTodoCommand(this.actionData);
	}

}

/*       S.D.G.       */
