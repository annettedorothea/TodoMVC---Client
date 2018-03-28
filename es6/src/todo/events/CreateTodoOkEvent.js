import AbstractCreateTodoOkEvent from "../../../gen/todo/events/AbstractCreateTodoOkEvent";

export default class CreateTodoOkEvent extends AbstractCreateTodoOkEvent {
    prepareDataForView() {
        this.eventData = JSON.parse(JSON.stringify(this.eventParam));
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */
