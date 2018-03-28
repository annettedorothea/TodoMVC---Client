import AbstractCreateTodoEmptyEvent from "../../../gen/todo/events/AbstractCreateTodoEmptyEvent";

export default class CreateTodoEmptyEvent extends AbstractCreateTodoEmptyEvent {
    prepareDataForView() {
        this.eventData = JSON.parse(JSON.stringify(this.eventParam));
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */
