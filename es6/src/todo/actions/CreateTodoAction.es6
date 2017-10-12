'use strict';

class CreateTodoAction extends AbstractCreateTodoAction {

    initActionData() {
        this.actionData.description = this.actionParam.description;
    }
}

/*       S.D.G.       */
