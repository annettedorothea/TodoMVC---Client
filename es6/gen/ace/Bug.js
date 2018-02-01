import ReplayUtils from "../../src/app/ReplayUtils";
import AppUtils from "../../src/app/AppUtils";
import ACEController from "./ACEController";

export function runBugE2E(bugId, pauseInMillis = 250, description = "unknown", executor = "unknown") {
    AppUtils.loadBug(bugId).then((bug) => {
        ReplayUtils.scenarioConfig = {
            executor,
            bugId,
            description,
            e2e: true
        };
        ACEController.expectedTimeline = JSON.parse(bug.timeline);
        ReplayUtils.e2e(pauseInMillis);
    });
}

export function runBugReplay(bugId, pauseInMillis = 250, description = "unknown", executor = "unknown") {
    AppUtils.loadBug(bugId).then((bug) => {
        ReplayUtils.scenarioConfig = {
            executor,
            bugId,
            description,
            e2e: false
        };
        ACEController.expectedTimeline = JSON.parse(bug.timeline);
        ReplayUtils.replay(pauseInMillis);
    });
}

export function saveBug(description, creator) {
    AppUtils.saveBug(description, creator);
}

export function deleteBug(id) {
    AppUtils.deleteBug(id);
}

export function resolveBug(id) {
    AppUtils.resolveBug(id);
}

export function displayBugs() {
    AppUtils.loadBugs().then((bugs) => {
        bugs.forEach((bug) => {
            console.log("bug", bug)
        })
    });
}

/*       S.D.G.       */

