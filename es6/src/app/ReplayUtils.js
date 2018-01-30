import ACEController from "../../gen/ace/ACEController";
import AppUtils from "./AppUtils";

export default class ReplayUtils {

    static normalizeTimelines(expected, actual) {
        let normalizedExpected = [];
        let normalizedActual = [];
        let expectedIndex = 0;
        let actualIndex = 0;
        while (expectedIndex < expected.length) {
            if (actualIndex >= actual.length) {
                normalizedExpected.push(expected[expectedIndex]);
                normalizedActual.push({});
                expectedIndex++;
            } else if (expected[expectedIndex].action && actual[actualIndex].action || !expected[expectedIndex].action && !actual[actualIndex].action) {
                normalizedExpected.push(expected[expectedIndex]);
                normalizedActual.push(actual[actualIndex]);
                expectedIndex++;
                actualIndex++;
            } else if (expected[expectedIndex].action && !actual[actualIndex].action) {
                normalizedExpected.push({});
                normalizedActual.push(actual[actualIndex]);
                actualIndex++;
            } else if (!expected[expectedIndex].action && actual[actualIndex].action) {
                normalizedExpected.push(expected[expectedIndex]);
                normalizedActual.push({});
                expectedIndex++;
            }
        }
        while (actualIndex < actual.length) {
            normalizedExpected.push({});
            normalizedActual.push(actual[actualIndex]);
            actualIndex++;
        }
        return {
            expected: normalizedExpected,
            actual: normalizedActual
        };
    }

    static resetDatabase() {
        return AppUtils.httpDelete('replay/database/reset');
    }

    static prepareAction(uuid) {
        if (ACEController.execution === ACEController.E2E) {
            return AppUtils.httpPut('replay/database/prepare?uuid=' + uuid);
        } else {
            return new Promise((resolve) => {
                resolve();
            });
        }
    }

    static replay(pauseInMillis) {
        ACEController.startReplay(ACEController.REPLAY, pauseInMillis)
    }

    static e2e(pauseInMillis) {
        ACEController.startReplay(ACEController.E2E, pauseInMillis)
    }

    static finishReplay() {
        const normalized = ReplayUtils.normalizeTimelines(ACEController.expectedTimeline, ACEController.actualTimeline);
        const result = JSON.stringify(normalized.expected, ReplayUtils.itemStringifyReplacer) === JSON.stringify(normalized.actual, ReplayUtils.itemStringifyReplacer);

        if (normalized.expected && normalized.actual) {
            const size = normalized.expected.length > normalized.actual.length ? normalized.expected.length : normalized.actual.length;
            for (let i = 0; i < size; i++) {
                const expected = normalized.expected[i] ? normalized.expected[i] : null;
                const actual = normalized.actual[i] ? normalized.actual[i] : null;
                const result = ReplayUtils.compareItems(expected, actual);
                const item = {
                    expected,
                    actual,
                    result
                };
                if (result === true) {
                    console.log("%cSUCCESS expected " + ReplayUtils.name(item.expected) + " actual " + ReplayUtils.name(item.actual), "color: green;", item);
                } else {
                    console.log("%cFAILURE expected " + ReplayUtils.name(item.expected) + " actual " + ReplayUtils.name(item.actual), "color: red;", item);
                }
            }
        }
        if (result === true) {
            console.log("%c===============", "color: green;");
            console.log("%c=== SUCCESS ===", "color: green;");
            console.log("%c===============", "color: green;");
        } else {
            console.log("%c===============", "color: red;");
            console.log("%c=== FAILURE ===", "color: red;");
            console.log("%c===============", "color: red;");
        }
        ReplayUtils.saveScenarioResult(normalized, result);
    }

    static name(item) {
        if (item.action) {
            return item.action.actionName;
        }
        if (item.command) {
            return item.command.commandName;
        }
        if (item.event) {
            return item.event.eventName;
        }
    }

    static compareItems(expected, actual) {
        return JSON.stringify(expected, ReplayUtils.itemStringifyReplacer) === JSON.stringify(actual, ReplayUtils.itemStringifyReplacer);
    }


    static itemStringifyReplacer(key, value) {
        if (key === 'timestamp') {
            return undefined;
        } else {
            return value;
        }
    }

    static saveScenario(description, creator) {
        const browser = AppUtils.getBrowserInfo();
        const data = {
            description,
            timeline: JSON.stringify(ACEController.timeline),
            creator,
            clientVersion: AppUtils.getClientVersion(),
            device: browser.name + " " + browser.version
        };
        return AppUtils.httpPost('api/scenario/create', null, data);
    }

    static deleteScenario(id) {
        let queryParams = [
            {
                key: "id",
                value: id
            }
        ];
        return AppUtils.httpDelete('api/scenario/delete', queryParams);
    }

    static loadScenarios() {
        return AppUtils.httpGet('api/scenario/all');
    }

    static loadScenario(id) {
        let queryParams = [];
        queryParams.push({
            key: "id",
            value: id
        });
        return AppUtils.httpGet('api/scenario/single', queryParams);
    }

    static saveScenarioResult(normalized, result) {
        const browser = AppUtils.getBrowserInfo();
        const data = {
            description: ReplayUtils.scenarioConfig.description,
            scenarioId: ReplayUtils.scenarioConfig.scenarioId,
            timeline: JSON.stringify(normalized),
            executor: ReplayUtils.scenarioConfig.executor,
            e2e: ReplayUtils.scenarioConfig.e2e,
            result,
            clientVersion: AppUtils.getClientVersion(),
            device: browser.name + " " + browser.version
        };
        return AppUtils.httpPost('api/scenario-result/create', null, data);
    }


}

/*       S.D.G.       */

