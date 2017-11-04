import AppUtils from "../../app/AppUtils";
import ReplayUtils from "../../app/ReplayUtils";

export default class ACEController {

    static init() {
        ACEController.timeline = [];
        ACEController.listeners = {};
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
            AppUtils.timelineChanged([item]);
        } else {
            ACEController.actualTimeline.push(JSON.parse(JSON.stringify(item)));
            ReplayUtils.actualTimelineChanged([item]);
        }
    }

    static downloadTimeline() {
        let timelineJson = JSON.stringify(ACEController.timeline, null, 2);

        let a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob([timelineJson], {type: 'text/json'}));
        a.download = 'scenario.json';

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
    }

    static initTimeline(timelineJson) {
        ACEController.expectedTimeline = timelineJson;
        ReplayUtils.expectedTimelineChanged(ACEController.expectedTimeline);
		ACEController.actualTimeline = [];
		ReplayUtils.actualTimelineChanged([]);
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
                ReplayUtils.finishReplay();
				ACEController.timeline = [];
				ACEController.actionIsProcessing = false;
				ACEController.actionQueue = [];
				ACEController.execution = ACEController.LIVE;
                AppUtils.start();
            }
        }
    }

    static triggerAction(action) {
        ACEController.addActionToQueue(action);
    }

    static replay(pauseInMillis) {
        ACEController.startReplay(ACEController.REPLAY, pauseInMillis)
    }

    static e2e(pauseInMillis) {
        ACEController.startReplay(ACEController.E2E, pauseInMillis)
    }

    static startReplay(level, pauseInMillis) {
        ACEController.passed = undefined;
        ACEController.actualTimeline = [];
        ACEController.pauseInMillis = undefined;
        ACEController.execution = level;
        ACEController.pauseInMillis = pauseInMillis;
        
        ReplayUtils.actualTimelineChanged([]);

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
        
        ReplayUtils.expectedTimelineChanged(ACEController.expectedTimeline);
        
        for (let i = 0; i < ACEController.expectedTimeline.length; i++) {
            let item = ACEController.expectedTimeline[i];
            if (item.action) {
				const actionParam = item.action.actionParam;
				let action = eval('new ' + item.action.actionName + '(actionParam)');
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
                return iHtem.command;
            }
        }
    }

}

ACEController.init();

/*       S.D.G.       */

