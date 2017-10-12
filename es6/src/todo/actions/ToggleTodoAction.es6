'use strict';

class ToggleTodoAction extends AbstractToggleTodoAction {

    initActionData() {
        this.actionData.id = this.actionParam.id;
    }
}

/*       S.D.G.       */
