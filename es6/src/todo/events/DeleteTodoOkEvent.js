import AbstractDeleteTodoOkEvent from "../../../gen/todo/events/AbstractDeleteTodoOkEvent";

export default class DeleteTodoOkEvent extends AbstractDeleteTodoOkEvent {
    prepareDataForView() {
        this.eventData = JSON.parse(JSON.stringify(this.eventParam));
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */
