import AbstractToggleTodoAction from "../../../gen/todo/actions/AbstractToggleTodoAction";

export default class ToggleTodoAction extends AbstractToggleTodoAction {

    initActionData() {
        this.actionData.id = this.actionParam.id;
    }
}

/*       S.D.G.       */
