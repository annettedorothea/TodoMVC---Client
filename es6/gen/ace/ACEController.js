/********************************************************************************
 * generated by de.acegen 1.5.5
 ********************************************************************************/




import * as AppUtils from "../../src/app/AppUtils";
import Event from "./Event";

export let timeline = [];
export let listeners = {};
export let delayedActions = {};

let actionQueue = [];
let triggeredActionsQueue = [];
let idle = true;


export function registerListener(eventName, listener) {
    if (!eventName.trim()) {
        throw new Error('cannot register listener for empty eventName');
    }
    if (!listener) {
        throw new Error('cannot register undefined listener for event ' + eventName);
    }
    let listenersForEventName;
    if (listeners[eventName] === undefined) {
        listeners[eventName] = [];
    }
    listenersForEventName = listeners[eventName];
    listenersForEventName.push(listener);
}

export function addItemToTimeLine(item) {
	if (AppUtils.settings && AppUtils.settings.timelineSize > 0) {
	    timeline.push(AppUtils.deepCopy(item));
		if (timeline.length > AppUtils.settings.timelineSize) {
		    timeline.shift();
		    while (timeline.length > 0 && timeline.length > 0 && !timeline[0].appState) {
		        timeline.shift();
		    }
		}
	}
}

export function addActionToQueue(action) {
	actionQueue.push(action);
    applyNextActions();
}

export function addActionToTriggeredActionsQueue(action, data) {
	triggeredActionsQueue.push({action, data});
	if (idle) {
		applyNextActions();
	}
}

function applyNextActions() {
	idle = false;
    let nextAction = actionQueue.shift();
    if (nextAction) {
		if (nextAction.action.asynchronous) {
            nextAction.action.applyAction(nextAction.data).then(() => {
            	if (nextAction.action.callback) {
            		nextAction.action.callback(nextAction.callback);
            	}
		    	applyNextActions();
		    }, (error) => {
		        AppUtils.displayUnexpectedError(error);
		    	applyNextActions();
		    });
		} else {
			try {
                nextAction.action.applyAction(nextAction.data);
		    	applyNextActions();
			} catch(error) {
		        AppUtils.displayUnexpectedError(error);
		    	applyNextActions();
			}
		}
    }
	let nextTriggeredAction = triggeredActionsQueue.shift();
	while (nextTriggeredAction) {
	    nextTriggeredAction.action.apply(nextTriggeredAction.data);
	    nextTriggeredAction = triggeredActionsQueue.shift();
	}
	idle = true;
}

export function startReplay(timeline, pauseInMillis) {
    AppUtils.startReplay();

    let events = [];
	
	let appStateWasSet = false;
    for (let i = 0; i < timeline.length; i++) {
        let item = timeline[i];
        if (item.event && appStateWasSet && item.event.eventName !== "TriggerAction") {
            events.push({
            	event: new Event(item.event.eventName),
            	data: item.event.data
            });
        }
		if (item.appState && !appStateWasSet) {
		    AppUtils.setInitialAppState(item.appState);
            AppUtils.stateUpdated();
		    appStateWasSet = true;
		}
    }
    
    console.info(`replay ${events.length} events`);

	setTimeout(() => replayNextEvent(events, pauseInMillis), pauseInMillis);
}

function replayNextEvent(events, pauseInMillis) {
    let nextEvent = events.shift();
    if (nextEvent) {
    	console.info("replay", nextEvent);
    	nextEvent.event.replay(nextEvent.data);
		AppUtils.stateUpdated();
    	setTimeout(() => replayNextEvent(events, pauseInMillis), pauseInMillis);
    } else {
        setTimeout(() => finishReplay(), pauseInMillis);
    }
}

function finishReplay() {
    console.info("replay finished");
    timeline = [];
    actionQueue = [];
    AppUtils.createInitialAppState();
    AppUtils.startApp();
}




/******* S.D.G. *******/




