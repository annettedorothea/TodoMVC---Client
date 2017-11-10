import Action from "../../ace/Action";
import ToggleTodoCommand from "../../../src/todo/commands/ToggleTodoCommand";
import CommonView from "../../../src/todo/views/CommonView";

export default class AbstractToggleTodoAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'todo.ToggleTodoAction', false);
    }

	getCommand() {
			return new ToggleTodoCommand(this.actionData);
	}

	
    preUpdateUI() {
		CommonView.block(this.actionParam);
    }

    postUpdateUI() {
		CommonView.unblock(this.actionParam);
    }

}

/*       S.D.G.       */
