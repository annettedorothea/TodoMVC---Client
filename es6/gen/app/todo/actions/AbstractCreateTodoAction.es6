'use strict';

class AbstractCreateTodoAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'CreateTodoAction', false);
    }

	getCommand() {
		return new CreateTodoCommand(this.actionData);
	}

}

/*       S.D.G.       */
