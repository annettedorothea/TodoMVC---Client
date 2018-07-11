import AbstractEditTodoOkEvent from "../../../gen/todo/events/AbstractEditTodoOkEvent";
import AppUtils from "../../app/AppUtils";

export default class EditTodoOkEvent extends AbstractEditTodoOkEvent {
    prepareDataForView() {
        this.eventData = AppUtils.deepCopy(this.eventData);
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */
