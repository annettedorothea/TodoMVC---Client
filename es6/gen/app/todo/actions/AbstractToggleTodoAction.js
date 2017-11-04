import Action from "../../../ace/Action";
import ToggleTodoCommand from "../../../../src/todo/commands/ToggleTodoCommand";

export default class AbstractToggleTodoAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'ToggleTodoAction', false);
    }

	getCommand() {
			return new ToggleTodoCommand(this.actionData);
	}

}

/*       S.D.G.       */
