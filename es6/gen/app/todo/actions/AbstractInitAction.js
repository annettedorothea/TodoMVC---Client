import Action from "../../../ace/Action";
import InitCommand from "../../../../src/todo/commands/InitCommand";

export default class AbstractInitAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'InitAction', true);
    }

	getCommand() {
			return new InitCommand(this.actionData);
	}

}

/*       S.D.G.       */
