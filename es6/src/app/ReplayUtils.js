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
            return AppUtils.httpPut('replay/e2e/prepare?uuid=' + uuid);
        } else {
            return new Promise((resolve) => {
                resolve();
            });
        }
    }

    static replay(pauseInMillis, serverTimeline) {
        AppUtils.httpPut('replay/e2e/start', [], JSON.parse(serverTimeline)).then(() => {
            ACEController.startReplay(ACEController.REPLAY, pauseInMillis)
        });
    }

    static e2e(pauseInMillis, serverTimeline) {
        AppUtils.httpPut('replay/e2e/start', [], JSON.parse(serverTimeline)).then(() => {
            ACEController.startReplay(ACEController.E2E, pauseInMillis)
        });
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
        if (ReplayUtils.scenarioConfig.finishReplay) {
            ReplayUtils.scenarioConfig.finishReplay(normalized, result);
            AppUtils.httpPut('replay/e2e/stop');
        }
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
        return AppUtils.httpGet('api/e2e/timeline').then((serverTimeline) => {
            return AppUtils.getServerInfo().then((serverInfo) => {
                const browser = AppUtils.getBrowserInfo();
                const uuid = AppUtils.createUUID();
                const data = {
                    description,
                    timeline: JSON.stringify(ACEController.timeline),
                    serverTimeline: JSON.stringify(serverTimeline),
                    creator,
                    clientVersion: AppUtils.getClientVersion(),
                    device: browser.name + " " + browser.version,
                    uuid,
                    apiKey: AppUtils.getApiKey(),
                    serverVersion: serverInfo.serverVersion
                };
                return AppUtils.httpPost(AppUtils.getAceScenariosBaseUrl() + 'api/scenarios/create', [], data);
            });
        });
    }

    static loadScenario(id) {
        const uuid = AppUtils.createUUID();
        let queryParams = [];
        queryParams.push({
            key: "id",
            value: id
        });
        queryParams.push({
            key: "apiKey",
            value: AppUtils.getApiKey()
        });
        queryParams.push({
            key: "uuid",
            value: uuid
        });
        return AppUtils.httpGet(AppUtils.getAceScenariosBaseUrl() + 'api/scenarios/get', queryParams);
    }

    static saveScenarioResult(normalized, result) {
        return AppUtils.getServerInfo().then((serverInfo) => {
            const browser = AppUtils.getBrowserInfo();
            const uuid = AppUtils.createUUID();
            const data = {
                scenarioId: ReplayUtils.scenarioConfig.scenarioId,
                timeline: JSON.stringify(normalized),
                executor: ReplayUtils.scenarioConfig.executor,
                e2e: ReplayUtils.scenarioConfig.e2e,
                result,
                uuid,
                clientVersion: AppUtils.getClientVersion(),
                device: browser.name + " " + browser.version,
                apiKey: AppUtils.getApiKey(),
                serverVersion: serverInfo.serverVersion
            };
            return AppUtils.httpPost(AppUtils.getAceScenariosBaseUrl() + 'api/results/create', null, data);
        });
    }

}

/*       S.D.G.       */

