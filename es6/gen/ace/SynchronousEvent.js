import ACEController from "./ACEController";
import Event from "./Event";
import AppUtils from "../../src/app/AppUtils";

export default class SynchronousEvent extends Event {

    publish() {
        this.prepareDataForView();
        if (this.eventName !== "TriggerAction") {
            this.eventData.notifiedListeners = this.getNotifiedListeners();
        }
        this.notifyListeners();
		ACEController.addItemToTimeLine({event: this});
    }

    notifyListeners() {
        let i, listener;
        if (this.eventName !== undefined) {
            const listenersForEvent = ACEController.listeners[this.eventName];
            if (listenersForEvent !== undefined) {
                for (i = 0; i < listenersForEvent.length; i += 1) {
                    listener = listenersForEvent[i];
					listener(AppUtils.deepCopy(this.eventData));
                }
            }
        }
    }

}

/*       S.D.G.       */


