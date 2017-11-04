import Action from "../../../ace/Action";
import ClearDoneCommand from "../../../../src/todo/commands/ClearDoneCommand";

export default class AbstractClearDoneAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'ClearDoneAction', false);
    }

	getCommand() {
			return new ClearDoneCommand(this.actionData);
	}

}

/*       S.D.G.       */
