import AbstractNewTodoChangedOkEvent from "../../../gen/todo/events/AbstractNewTodoChangedOkEvent";
import AppUtils from "../../app/AppUtils";

export default class NewTodoChangedOkEvent extends AbstractNewTodoChangedOkEvent {
    prepareDataForView() {
        this.eventData = AppUtils.deepCopy(this.eventData);
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */
