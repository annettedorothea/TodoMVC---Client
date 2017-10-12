'use strict';

class TriggerAction extends Event {
    constructor(action) {
        super(action, 'TriggerAction');
        this.eventData = action;
    }
    prepareDataForView() {
    }
}

/*       S.D.G.       */

