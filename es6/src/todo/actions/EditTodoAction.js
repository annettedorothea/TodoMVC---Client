import AbstractEditTodoAction from "../../../gen/todo/actions/AbstractEditTodoAction";

export default class EditTodoAction extends AbstractEditTodoAction {

    initActionData() {
        this.actionData.id = this.actionParam.id;
    }
}

/*       S.D.G.       */
