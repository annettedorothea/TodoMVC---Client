import AbstractDeleteTodoAction from "../../../gen/todo/actions/AbstractDeleteTodoAction";

export default class DeleteTodoAction extends AbstractDeleteTodoAction {

    initActionData() {
        this.actionData.id = this.actionParam.id;
    }
}

/*       S.D.G.       */
