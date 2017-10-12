'use strict';

class EditTodoAction extends AbstractEditTodoAction {

    initActionData() {
        this.actionData.id = this.actionParam.id;
    }
}

/*       S.D.G.       */
