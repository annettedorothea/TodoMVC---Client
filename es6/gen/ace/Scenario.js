import ReplayUtils from "../../src/app/ReplayUtils";
import ACEController from "./ACEController";

export function runScenarioE2E(scenarioId, pauseInMillis = 250, description = "unknown", executor = "unknown") {
    ReplayUtils.loadScenario(scenarioId).then((scenario) => {
        ReplayUtils.scenarioConfig = {
            executor,
            scenarioId,
            description,
            e2e: true
        };
        ACEController.expectedTimeline = JSON.parse(scenario.timeline);
        ReplayUtils.e2e(pauseInMillis);
    });
}

export function runScenarioReplay(scenarioId, pauseInMillis = 250, description = "unknown", executor = "unknown") {
    ReplayUtils.loadScenario(scenarioId).then((scenario) => {
        ReplayUtils.scenarioConfig = {
            executor,
            scenarioId,
            description,
            e2e: false
        };
        ACEController.expectedTimeline = JSON.parse(scenario.timeline);
        ReplayUtils.replay(pauseInMillis);
    });
}

export function saveScenario(description, creator) {
    ReplayUtils.saveScenario(description, creator);
}

export function displayScenarios(description, creator) {
    ReplayUtils.loadScenarios().then((scenarios) => {
        scenarios.forEach((scenario) => {
            console.log("scenario", scenario)
        })
    });
}

/*       S.D.G.       */

