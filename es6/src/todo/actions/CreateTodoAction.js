import AbstractCreateTodoAction from "../../../gen/todo/actions/AbstractCreateTodoAction";

export default class CreateTodoAction extends AbstractCreateTodoAction {

    initActionData() {
        this.actionData.description = this.actionParam.description;
    }
}

/*       S.D.G.       */
