import AppUtils from "../../src/app/AppUtils";

export default class Event {
    constructor(eventData, eventName) {
        this.eventName = eventName;
        this.eventData = AppUtils.deepCopy(eventData);
    }

    prepareDataForView() {
        throw "no prepareDataForView method defined for " + this.eventName;
    }

    getNotifiedListeners() {
        return [];
    }

}

/*       S.D.G.       */


