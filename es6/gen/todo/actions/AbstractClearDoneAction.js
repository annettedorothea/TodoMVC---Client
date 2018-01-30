import Action from "../../ace/Action";
import ClearDoneCommand from "../../../src/todo/commands/ClearDoneCommand";
import CommonView from "../../../src/todo/views/CommonView";

export default class AbstractClearDoneAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'todo.ClearDoneAction', false);
    }

	getCommand() {
		return new ClearDoneCommand(this.actionData);
	}

	preUpdateUI() {
		CommonView.block(this.actionParam);
	}

	postUpdateUI() {
		CommonView.unblock(this.actionParam);
	}

}

/*       S.D.G.       */
