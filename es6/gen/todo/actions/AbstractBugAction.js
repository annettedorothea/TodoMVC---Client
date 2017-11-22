import Action from "../../ace/Action";
import BugCommand from "../../../src/todo/commands/BugCommand";

export default class AbstractBugAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'todo.BugAction', false);
    }

	getCommand() {
			return new BugCommand(this.actionData);
	}

	
    preUpdateUI() {
    }

    postUpdateUI() {
    }

}

/*       S.D.G.       */
