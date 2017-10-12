'use strict';

class AbstractGetTodoListAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'GetTodoListAction', false);
    }

	getCommand() {
		return new GetTodoListCommand(this.actionData);
	}

}

/*       S.D.G.       */
