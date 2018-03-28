import AbstractGetTodoListOkEvent from "../../../gen/todo/events/AbstractGetTodoListOkEvent";

export default class GetTodoListOkEvent extends AbstractGetTodoListOkEvent {
    prepareDataForView() {
        this.eventData = JSON.parse(JSON.stringify(this.eventParam));
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */
