import Action from "../../../ace/Action";
import ToggleAllCommand from "../../../../src/todo/commands/ToggleAllCommand";

export default class AbstractToggleAllAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'ToggleAllAction', false);
    }

	getCommand() {
			return new ToggleAllCommand(this.actionData);
	}

}

/*       S.D.G.       */
