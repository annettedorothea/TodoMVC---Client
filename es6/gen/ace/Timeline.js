/********************************************************************************
 * generated by de.acegen
 ********************************************************************************/




import * as AppState from "../../src/AppState";
import * as ACEController from "./ACEController";
import * as Utils from "./Utils";

export function replayTimeline(timelineId, pauseInMillis = 100) {
	if (pauseInMillis < 100) {
		pauseInMillis = 100;
	}
    Utils.loadTimeline(timelineId).then((scenario) => {
        AppState.createInitialAppState();
        ACEController.startReplay(JSON.parse(scenario.timeline), pauseInMillis)
    });
}

export function saveTimeline(description, creator) {
    Utils.saveTimeline(description, creator).then((id) => {
        console.info(`saved timeline with id ${id}`);
    });
}

export function dumpTimeline() {
    console.info(ACEController.timeline);
}




/******* S.D.G. *******/




