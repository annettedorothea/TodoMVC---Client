import AppUtils from "../../src/app/AppUtils";
import ReplayUtils from "../../src/app/ReplayUtils";
import {runScenario} from "./Scenario";

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
        ACEController.timelineSize = 200;
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
            ACEController.timeline.push(JSON.parse(JSON.stringify(item)));
            if (ACEController.timeline.length > ACEController.timelineSize) {
                let i;
                for (i = 1; i < ACEController.timeline.length; i++) {
                    if (ACEController.timeline[i].action && ACEController.timeline[i].action.isInitAction) {
                        break;
                    }
                }
                if (i < ACEController.timeline.length) {
                    for (let j = 0; j < i; j++) {
                        ACEController.timeline.shift();
                    }
                }
            }
            AppUtils.timelineChanged(item);
        } else {
            ACEController.actualTimeline.push(JSON.parse(JSON.stringify(item)));
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
            action.applyAction().then(() => {
            }, (error) => {
                ACEController.actionIsProcessing = false;
                throw new Error(error + " when applying action " + action.actionName);
            });
        } else if (action === undefined) {
            ACEController.actionIsProcessing = false;
            if (ACEController.execution !== ACEController.LIVE) {
				ACEController.timeline = [];
				ACEController.actionIsProcessing = false;
				ACEController.actionQueue = [];
				ACEController.execution = ACEController.LIVE;
                ReplayUtils.finishReplay();
                AppUtils.start();
            }
        }
    }

    static triggerAction(action) {
        ACEController.addActionToQueue(action);
    }

    static startReplay(level, pauseInMillis) {
        ACEController.actualTimeline = [];
        ACEController.execution = level;
        ACEController.pauseInMillis = pauseInMillis;
        
        if (ACEController.execution === ACEController.REPLAY) {
            ACEController.readTimelineAndCreateReplayActions();
        } else {
            ReplayUtils.resetDatabase().then(
                () => {
                    ACEController.readTimelineAndCreateReplayActions();
                },
                (error) => {
                    throw error;
                }
            );
        }

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
				const actionParam = item.action.actionParam;
				let action = ACEController.factories[item.action.actionName](actionParam);
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
            if (item.command && item.command.commandParam.uuid === uuid) {
                return item.command;
            }
        }
    }

}

ACEController.init();

/*       S.D.G.       */

