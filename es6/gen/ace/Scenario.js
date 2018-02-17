import AppUtils from "../../src/app/AppUtils";
import ReplayUtils from "../../src/app/ReplayUtils";
import ACEController from "./ACEController";

export function runScenarioE2E(scenarioId, pauseInMillis = 250, executor = "unknown") {
    ReplayUtils.loadScenario(scenarioId).then((scenario) => {
        ReplayUtils.scenarioConfig = {
            executor,
            scenarioId,
            e2e: true,
			finishReplay: ReplayUtils.saveScenarioResult
        };
        ACEController.expectedTimeline = JSON.parse(scenario.timeline);
        ReplayUtils.e2e(pauseInMillis);
    });
}

export function runScenarioReplay(scenarioId, pauseInMillis = 250, executor = "unknown") {
    ReplayUtils.loadScenario(scenarioId).then((scenario) => {
        ReplayUtils.scenarioConfig = {
            executor,
            scenarioId,
            e2e: false,
			finishReplay: ReplayUtils.saveScenarioResult
        };
        ACEController.expectedTimeline = JSON.parse(scenario.timeline);
        ReplayUtils.replay(pauseInMillis);
    });
}

export function saveScenario(description, creator) {
	ReplayUtils.saveScenario(description, creator).then((id) => {
	    console.log(`saved scenario with id ${id}`);
		ACEController.timeline = [];
		AppUtils.start();
	});
}

export function displayScenarios() {
    ReplayUtils.loadScenarios().then((scenarios) => {
        scenarios.forEach((scenario) => {
            console.log("scenario", scenario)
        })
    });
}

/*       S.D.G.       */

