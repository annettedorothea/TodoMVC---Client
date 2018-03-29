import AbstractEditTodoOkEvent from "../../../gen/todo/events/AbstractEditTodoOkEvent";

export default class EditTodoOkEvent extends AbstractEditTodoOkEvent {
    prepareDataForView() {
        this.eventData = Object.assign({}, this.eventParam);
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */
