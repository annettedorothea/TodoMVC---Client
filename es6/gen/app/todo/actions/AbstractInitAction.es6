'use strict';

class AbstractInitAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'InitAction', true);
    }

	getCommand() {
		return new InitCommand(this.actionData);
	}

}

/*       S.D.G.       */
