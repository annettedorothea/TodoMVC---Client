import Action from "../../ace/Action";
import ToggleAllCommand from "../../../src/todo/commands/ToggleAllCommand";
import CommonView from "../../../src/todo/views/CommonView";

export default class AbstractToggleAllAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'todo.ToggleAllAction', false);
    }

	getCommand() {
		return new ToggleAllCommand(this.actionData);
	}

	preUpdateUI() {
		CommonView.block(this.actionParam);
	}

	postUpdateUI() {
		CommonView.unblock(this.actionParam);
	}

}

/*       S.D.G.       */
