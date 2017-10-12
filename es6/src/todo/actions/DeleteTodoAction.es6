'use strict';

class DeleteTodoAction extends AbstractDeleteTodoAction {

    initActionData() {
        this.actionData.id = this.actionParam.id;
    }
}

/*       S.D.G.       */
