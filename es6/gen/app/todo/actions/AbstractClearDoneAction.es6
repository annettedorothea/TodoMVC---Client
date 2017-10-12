'use strict';

class AbstractClearDoneAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'ClearDoneAction', false);
    }

	getCommand() {
		return new ClearDoneCommand(this.actionData);
	}

}

/*       S.D.G.       */
