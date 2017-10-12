'use strict';

class AbstractDeleteTodoAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'DeleteTodoAction', false);
    }

	getCommand() {
		return new DeleteTodoCommand(this.actionData);
	}

}

/*       S.D.G.       */
