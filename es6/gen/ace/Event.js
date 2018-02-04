import ACEController from "./ACEController";

export default class Event {
    constructor(eventParam, eventName) {
        this.eventName = eventName;
        this.eventParam = eventParam;
    }

    prepareDataForView() {
        throw "no prepareDataForView method defined for " + this.eventName;

    }

    publish() {
        return new Promise((resolve, reject) => {
            this.prepareDataForView();
            ACEController.addItemToTimeLine({event: this});
            Promise.all(this.notifyListeners()).then(() => {
                resolve();
            }, (error) => {
                reject(error + "\n" + this.eventName);
            });
        });
    }

    notifyListeners() {
        let promises = [];
        let i, listener;
        if (this.eventName !== undefined) {
            const listenersForEvent = ACEController.listeners[this.eventName];
            if (listenersForEvent !== undefined) {
                for (i = 0; i < listenersForEvent.length; i += 1) {
                    listener = listenersForEvent[i];
                    promises.push(listener(this.eventData));
                }
            }
        }
        return promises;
    }

}

/*       S.D.G.       */

