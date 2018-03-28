import AbstractToggleTodoOkEvent from "../../../gen/todo/events/AbstractToggleTodoOkEvent";

export default class ToggleTodoOkEvent extends AbstractToggleTodoOkEvent {
    prepareDataForView() {
        this.eventData = JSON.parse(JSON.stringify(this.eventParam));
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */
