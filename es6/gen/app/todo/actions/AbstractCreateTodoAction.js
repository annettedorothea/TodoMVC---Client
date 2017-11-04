import Action from "../../../ace/Action";
import CreateTodoCommand from "../../../../src/todo/commands/CreateTodoCommand";

export default class AbstractCreateTodoAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'CreateTodoAction', false);
    }

	getCommand() {
			return new CreateTodoCommand(this.actionData);
	}

}

/*       S.D.G.       */
