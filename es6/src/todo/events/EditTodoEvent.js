import AbstractEditTodoEvent from "../../../gen/todo/events/AbstractEditTodoEvent";

export default class EditTodoEvent extends AbstractEditTodoEvent {
    prepareDataForView() {
        this.eventData = JSON.parse(JSON.stringify(this.eventParam));
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */
