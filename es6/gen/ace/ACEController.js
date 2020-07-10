/* 
 * Copyright (c) 2020, Annette Pohl, Koblenz, Germany
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.

 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * generated with de.acegen 0.9.7
 *
 */




import AppUtils from "../../src/app/AppUtils";
import Utils from "./Utils";
import * as AppState from "./AppState";

export default class ACEController {

    static init() {
        ACEController.timeline = [];
        ACEController.listeners = {};
        ACEController.factories = {};
        ACEController.registerListener('TriggerAction', ACEController.triggerAction);
        ACEController.actionIsProcessing = false;
        ACEController.actionQueue = [];
        ACEController.UI = 1;
        ACEController.REPLAY = 2;
        ACEController.E2E = 3;
        ACEController.execution = ACEController.UI;
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
		if (ACEController.execution === ACEController.UI && Utils.isDevelopment() && Utils.getTimelineSize() > 0) {
		    ACEController.timeline.push(AppUtils.deepCopy(item));
		    if (ACEController.timeline.length > Utils.getTimelineSize()) {
                ACEController.timeline.shift();
		        while (ACEController.timeline.length > 0 && ACEController.timeline.length > 0 && !ACEController.timeline[0].appState) {
                    ACEController.timeline.shift();
                }
		    }
		} else if (ACEController.execution !== ACEController.UI) {
		    ACEController.actualTimeline.push(AppUtils.deepCopy(item));
		}
    }

    static addActionToQueue(action) {
        if (ACEController.execution === ACEController.UI) {
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
	    	ACEController.addItemToTimeLine({appState: AppState.getAppState()});
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
            if (ACEController.execution !== ACEController.UI) {
                ACEController.timeline = [];
                ACEController.actionIsProcessing = false;
                ACEController.actionQueue = [];
                ACEController.execution = ACEController.UI;
                Utils.finishReplay();
                AppUtils.start();
            }
        }
    }
    
    static callApplyNextActions() {
    	if (ACEController.execution === ACEController.UI) {
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
		
		let appStateWasSet = false;
        for (let i = 0; i < ACEController.expectedTimeline.length; i++) {
            let item = ACEController.expectedTimeline[i];
            if (item.action) {
                const actionData = item.action.actionData;
                let action = ACEController.factories[item.action.actionName](actionData);
                action.actionData = actionData;
                actions.push(action);
            }
			if (item.appState && !appStateWasSet) {
			    AppState.setInitialAppState(item.appState);
			    appStateWasSet = true;
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




/******* S.D.G. *******/




