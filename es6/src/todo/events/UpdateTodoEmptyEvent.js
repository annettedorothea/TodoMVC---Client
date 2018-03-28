import AbstractUpdateTodoEmptyEvent from "../../../gen/todo/events/AbstractUpdateTodoEmptyEvent";

export default class UpdateTodoEmptyEvent extends AbstractUpdateTodoEmptyEvent {
    prepareDataForView() {
        this.eventData = JSON.parse(JSON.stringify(this.eventParam));
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */
