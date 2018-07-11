import AbstractGetTodoListOkEvent from "../../../gen/todo/events/AbstractGetTodoListOkEvent";
import AppUtils from "../../app/AppUtils";

export default class GetTodoListOkEvent extends AbstractGetTodoListOkEvent {
    prepareDataForView() {
        this.eventData = AppUtils.deepCopy(this.eventData);
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */
