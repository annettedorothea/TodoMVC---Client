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
 * generated with de.acegen 0.9.10
 *
 */




import AppUtils from "../../src/app/AppUtils";
import ReplayUtils from "../../src/app/ReplayUtils";
import ACEController from "./ACEController";
import Utils from "./Utils";

export function runScenario(scenarioId, executor = "unknown", pauseInMillis = 0) {
    if (Utils.isDevelopment() === false) {
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
    if (Utils.isDevelopment() === false) {
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
    if (Utils.isDevelopment() === false) {
        console.error("saveScenario is only available during development");
    } else {
        Utils.saveScenario(description, creator).then((id) => {
            console.log(`saved scenario with id ${id}`);
            ACEController.timeline = [];
            AppUtils.start();
        });
    }
}




/******* S.D.G. *******/





