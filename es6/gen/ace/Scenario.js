import AppUtils from "../../src/app/AppUtils";
import ReplayUtils from "../../src/app/ReplayUtils";
import ACEController from "./ACEController";
import Utils from "./Utils";

export function runScenario(scenarioId, executor = "unknown", pauseInMillis = 0) {
    if (AppUtils.isDevelopment() === false) {
        console.error("runScenario is only available during development");
    } else {
        Utils.loadScenario(scenarioId).then((scenario) => {
            ReplayUtils.scenarioConfig = {
                executor,
                scenarioId,
                saveScenarioResult: true
            };
            ACEController.expectedTimeline = JSON.parse(scenario.timeline);
            Utils.replayE2E(pauseInMillis, scenario.serverTimeline);
        });
    }
}

export function runAllScenarios(executor = "unknown", pauseInMillis = 0) {
    if (AppUtils.isDevelopment() === false) {
        console.error("runAllScenarios is only available during development");
    } else {
        Utils.loadNextScenario(null).then((scenario) => {
            if (scenario) {
                ReplayUtils.scenarioConfig = {
                    executor,
                    scenarioId: scenario.id,
                    saveScenarioResult: true,
                    runAllScenarios: true,
                    pauseInMillis
                };
                ACEController.expectedTimeline = JSON.parse(scenario.timeline);
                Utils.replayE2E(pauseInMillis, scenario.serverTimeline);
            }
        });
    }
}

export function saveScenario(description, creator) {
    if (AppUtils.isDevelopment() === false) {
        console.error("saveScenario is only available during development");
    } else {
        Utils.saveScenario(description, creator).then((id) => {
            console.log(`saved scenario with id ${id}`);
            ACEController.timeline = [];
            AppUtils.start();
        });
    }
}

/*       S.D.G.       */


