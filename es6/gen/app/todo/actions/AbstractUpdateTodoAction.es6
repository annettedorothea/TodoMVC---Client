'use strict';

class AbstractUpdateTodoAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'UpdateTodoAction', false);
    }

	getCommand() {
		return new UpdateTodoCommand(this.actionData);
	}

}

/*       S.D.G.       */
