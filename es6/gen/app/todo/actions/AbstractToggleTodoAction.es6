'use strict';

class AbstractToggleTodoAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'ToggleTodoAction', false);
    }

	getCommand() {
		return new ToggleTodoCommand(this.actionData);
	}

}

/*       S.D.G.       */
