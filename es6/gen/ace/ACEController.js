import AppUtils from "../../src/app/AppUtils";
import Utils from "./Utils";

export default class ACEController {

    static init() {
        ACEController.timeline = [];
        ACEController.listeners = {};
        ACEController.factories = {};
        ACEController.registerListener('TriggerAction', ACEController.triggerAction);
        ACEController.actionIsProcessing = false;
        ACEController.actionQueue = [];
        ACEController.LIVE = 1;
        ACEController.REPLAY = 2;
        ACEController.E2E = 3;
        ACEController.execution = ACEController.LIVE;
        ACEController.actualTimeline = [];
        ACEController.expectedTimeline = [];
    }

    static registerListener(eventName, listener) {
        if (!eventName.trim()) {
            throw new Error('cannot register listener for empty eventName');
        }
        if (!listener) {
            throw new Error('cannot register undefined listener for event ' + eventName);
        }
        let listenersForEventName;
        if (ACEController.listeners[eventName] === undefined) {
            ACEController.listeners[eventName] = [];
        }
        listenersForEventName = ACEController.listeners[eventName];
        listenersForEventName.push(listener);
    }

    static registerFactory(actionName, factory) {
        if (!actionName.trim()) {
            throw new Error('cannot register factory for empty actionName');
        }
        if (!factory) {
            throw new Error('cannot register undefined factory for action ' + actionName);
        }
        ACEController.factories[actionName] = factory;
    }

    static addItemToTimeLine(item) {
        let timestamp = new Date();
        item.timestamp = timestamp.getTime();
        if (ACEController.execution === ACEController.LIVE) {
            if (ACEController.timeline.length < AppUtils.getMaxTimelineSize()) {
				ACEController.timeline.push(AppUtils.deepCopy(item));
			} else {
				console.debug(`timeline size ${AppUtils.getMaxTimelineSize()} exceeded - item was not added`, item);
			}
        } else {
            ACEController.actualTimeline.push(AppUtils.deepCopy(item));
        }
    }

    static addActionToQueue(action) {
        if (ACEController.execution === ACEController.LIVE) {
            ACEController.actionQueue.push(action);
            if (ACEController.actionIsProcessing === false) {
                ACEController.actionIsProcessing = true;
                ACEController.applyNextActions();
            }
        }
    }

    static applyNextActions() {
        let action = ACEController.actionQueue.shift();
        if (action) {
			if (action.asynchronous) {
			    action.applyAction().then(() => {
			    	ACEController.callApplyNextActions();
			    }, (error) => {
			        AppUtils.displayUnexpectedError(error);
			    	ACEController.callApplyNextActions();
			    });
			} else {
				try {
					action.applyAction();
			    	ACEController.callApplyNextActions();
				} catch(error) {
			        AppUtils.displayUnexpectedError(error);
			    	ACEController.callApplyNextActions();
				}
			}
        } else if (action === undefined) {
            ACEController.actionIsProcessing = false;
            if (ACEController.execution !== ACEController.LIVE) {
                ACEController.timeline = [];
                ACEController.actionIsProcessing = false;
                ACEController.actionQueue = [];
                ACEController.execution = ACEController.LIVE;
                Utils.finishReplay();
                AppUtils.start();
            }
        }
    }
    
    static callApplyNextActions() {
    	if (ACEController.execution === ACEController.LIVE) {
    		ACEController.applyNextActions();
    	} else {
			setTimeout(ACEController.applyNextActions, ACEController.pauseInMillis);
		}
    }

    static triggerAction(action) {
        ACEController.addActionToQueue(action);
    }

    static startReplay(level, pauseInMillis) {
        ACEController.actualTimeline = [];
        ACEController.execution = level;
        ACEController.pauseInMillis = pauseInMillis;
        ACEController.readTimelineAndCreateReplayActions();
    }

    static readTimelineAndCreateReplayActions() {
        let actions = [];
        if (ACEController.expectedTimeline.length === 0) {
            for (let i = 0; i < ACEController.timeline.length; i++) {
                let item = ACEController.timeline[i];
                ACEController.expectedTimeline.push(item);
            }
        }

        for (let i = 0; i < ACEController.expectedTimeline.length; i++) {
            let item = ACEController.expectedTimeline[i];
            if (item.action) {
                const actionData = item.action.actionData;
                let action = ACEController.factories[item.action.actionName](actionData);
                action.actionData.uuid = item.action.actionData.uuid;
                actions.push(action);
            }
        }

        ACEController.actionQueue = actions;

        ACEController.applyNextActions();
    }

    static getCommandByUuid(uuid) {
        for (let i = 0; i < ACEController.expectedTimeline.length; i++) {
            let item = ACEController.expectedTimeline[i];
            if (item.command && item.command.commandData.uuid === uuid) {
                return item.command;
            }
        }
    }

}

ACEController.init();

/*       S.D.G.       */

