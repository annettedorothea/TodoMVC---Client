import AbstractCreateTodoAction from "../../../gen/app/todo/actions/AbstractCreateTodoAction";

export default class CreateTodoAction extends AbstractCreateTodoAction {

    initActionData() {
        this.actionData.description = this.actionParam.description;
    }
}

/*       S.D.G.       */
