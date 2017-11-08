import AbstractUpdateTodoAction from "../../../gen/todo/actions/AbstractUpdateTodoAction";

export default class UpdateTodoAction extends AbstractUpdateTodoAction {

    initActionData() {
        this.actionData.id = this.actionParam.id;
        this.actionData.description = this.actionParam.description;
    }
}

/*       S.D.G.       */
