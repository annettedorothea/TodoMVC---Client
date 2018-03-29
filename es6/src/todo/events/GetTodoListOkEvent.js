import AbstractGetTodoListOkEvent from "../../../gen/todo/events/AbstractGetTodoListOkEvent";

export default class GetTodoListOkEvent extends AbstractGetTodoListOkEvent {
    prepareDataForView() {
        this.eventData = Object.assign({}, this.eventParam);
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */
