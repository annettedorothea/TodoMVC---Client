'use strict';

class AbstractToggleAllAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'ToggleAllAction', false);
    }

	getCommand() {
		return new ToggleAllCommand(this.actionData);
	}

}

/*       S.D.G.       */
