import AppUtils from "../../src/app/AppUtils";
import ReplayUtils from "../../src/app/ReplayUtils";
import ACEController from "./ACEController";
import Utils from "./Utils";

export function runScenario(scenarioId, executor = "unknown", pauseInMillis = 0) {
    Utils.loadScenario(scenarioId).then((scenario) => {
        ReplayUtils.scenarioConfig = {
            executor,
            scenarioId,
            finishReplay: Utils.saveScenarioResult
        };
        ACEController.expectedTimeline = JSON.parse(scenario.timeline);
        Utils.replayE2E(pauseInMillis, scenario.serverTimeline);
    });
}

export function saveScenario(description, creator) {
    Utils.saveScenario(description, creator).then((id) => {
        console.log(`saved scenario with id ${id}`);
        ACEController.timeline = [];
        AppUtils.start();
    });
}

/*       S.D.G.       */

