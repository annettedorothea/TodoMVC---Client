import AppUtils from "../../src/app/AppUtils";
import ACEController from "./ACEController";

export default class Event {
    constructor(eventData, eventName) {
        this.eventName = eventName;
        this.eventData = AppUtils.deepCopy(eventData);
    }

    publish() {
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


