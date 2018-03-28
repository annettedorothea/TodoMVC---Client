import AbstractUpdateTodoOkEvent from "../../../gen/todo/events/AbstractUpdateTodoOkEvent";

export default class UpdateTodoOkEvent extends AbstractUpdateTodoOkEvent {
    prepareDataForView() {
        this.eventData = JSON.parse(JSON.stringify(this.eventParam));
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */
