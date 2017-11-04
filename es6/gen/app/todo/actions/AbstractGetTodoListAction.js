import Action from "../../../ace/Action";
import GetTodoListCommand from "../../../../src/todo/commands/GetTodoListCommand";

export default class AbstractGetTodoListAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'GetTodoListAction', false);
    }

	getCommand() {
			return new GetTodoListCommand(this.actionData);
	}

}

/*       S.D.G.       */
