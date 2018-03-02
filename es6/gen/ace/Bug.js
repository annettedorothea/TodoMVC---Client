import ReplayUtils from "../../src/app/ReplayUtils";
import ACEController from "./ACEController";
import Utils from "./Utils";

export function runBug(bugId, pauseInMillis = 0) {
    Utils.loadBug(bugId).then((scenario) => {
        ReplayUtils.scenarioConfig = {};
        ACEController.expectedTimeline = JSON.parse(scenario.timeline);
        Utils.replayServerless(pauseInMillis);
    });
}

export function saveBug(description, creator) {
    Utils.saveBug(description, creator).then((id) => {
        console.log(`saved bug with id ${id}`);
    });
}

/*       S.D.G.       */

