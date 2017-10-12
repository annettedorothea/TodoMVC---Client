'use strict';

class AbstractEditTodoAction extends Action {

    constructor(actionParam) {
        super(actionParam, 'EditTodoAction', false);
    }

	getCommand() {
		return new EditTodoCommand(this.actionData);
	}

}

/*       S.D.G.       */
