import AbstractEditedTodoChangedOkEvent from "../../../gen/todo/events/AbstractEditedTodoChangedOkEvent";
import AppUtils from "../../app/AppUtils";

export default class EditedTodoChangedOkEvent extends AbstractEditedTodoChangedOkEvent {
    prepareDataForView() {
        this.eventData = AppUtils.deepCopy(this.eventData);
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */
