import AppUtils from "../../src/app/AppUtils";
import ACEController from "./ACEController";
import ReplayUtils from "../../src/app/ReplayUtils";

export default class Utils {

    static getServerInfo() {
        return AppUtils.httpGet('api/server/info');
    }

    static saveBug(description, creator) {
        return Utils.getServerInfo().then((serverInfo) => {
            const browser = Utils.getBrowserInfo();
            const uuid = AppUtils.createUUID();
            const data = {
                description,
                timeline: JSON.stringify(ACEController.timeline),
                creator,
                clientVersion: AppUtils.getClientVersion(),
                device: browser.name + " " + browser.version,
                uuid,
                apiKey: AppUtils.getApiKey(),
                serverVersion: serverInfo.serverVersion
            };
            return AppUtils.httpPost(AppUtils.getAceScenariosBaseUrl() + 'api/bugs/create', [], data);
        });
    }

    static loadBug(id) {
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
        return AppUtils.httpGet(AppUtils.getAceScenariosBaseUrl() + 'api/bugs/get', queryParams);
    }

    static saveScenario(description, creator) {
        return AppUtils.httpGet('api/e2e/timeline').then((serverTimeline) => {
            return Utils.getServerInfo().then((serverInfo) => {
                const browser = Utils.getBrowserInfo();
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

    static saveScenarioResult(normalized, result) {
        return AppUtils.httpGet('replay/e2e/timeline').then((serverTimeline) => {
            return Utils.getServerInfo().then((serverInfo) => {
                const browser = Utils.getBrowserInfo();
                const uuid = AppUtils.createUUID();
                const data = {
                    scenarioId: ReplayUtils.scenarioConfig.scenarioId,
                    timeline: JSON.stringify(normalized),
                    executor: ReplayUtils.scenarioConfig.executor,
                    result,
                    uuid,
                    clientVersion: AppUtils.getClientVersion(),
                    device: browser.name + " " + browser.version,
                    apiKey: AppUtils.getApiKey(),
                    serverVersion: serverInfo.serverVersion,
                    serverTimeline: JSON.stringify(serverTimeline)
                };
                return AppUtils.httpPost(AppUtils.getAceScenariosBaseUrl() + 'api/results/create', null, data);
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

    static loadNextScenario(lastId) {
        const uuid = AppUtils.createUUID();
        let queryParams = [];
        queryParams.push({
            key: "lastId",
            value: lastId
        });
        queryParams.push({
            key: "apiKey",
            value: AppUtils.getApiKey()
        });
        queryParams.push({
            key: "uuid",
            value: uuid
        });
        return AppUtils.httpGet(AppUtils.getAceScenariosBaseUrl() + 'api/scenarios/next', queryParams);
    }

    static getBrowserInfo() {
        let ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return {name: 'IE ', version: (tem[1] || '')};
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR\/(\d+)/)
            if (tem != null) {
                return {name: 'Opera', version: tem[1]};
            }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) {
            M.splice(1, 1, tem[1]);
        }
        return {
            name: M[0],
            version: M[1]
        };
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

    static replayServerless(pauseInMillis) {
        ReplayUtils.prepareReplay();
        ACEController.startReplay(ACEController.REPLAY, pauseInMillis)
    }

    static replayE2E(pauseInMillis, serverTimeline) {
        ReplayUtils.prepareReplay();
        AppUtils.httpPut('replay/e2e/start', [], JSON.parse(serverTimeline)).then(() => {
            ACEController.startReplay(ACEController.E2E, pauseInMillis)
        });
    }

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

    static finishReplay() {
    	ReplayUtils.tearDownReplay();
        if (ReplayUtils.scenarioConfig.saveScenarioResult === true) {
            const normalized = Utils.normalizeTimelines(ACEController.expectedTimeline, ACEController.actualTimeline);
            const result = ReplayUtils.compareItems(normalized.expected, normalized.actual);

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
                        console.log("%cSUCCESS expected " + Utils.name(item.expected) + " actual " + Utils.name(item.actual), "color: green;", item);
                    } else {
                        console.log("%cFAILURE expected " + Utils.name(item.expected) + " actual " + Utils.name(item.actual), "color: red;", item);
                    }
                }
            }
            if (result === true) {
                console.log("%c===============", "color: green;");
                console.log("%c=== SCENARIO " + ReplayUtils.scenarioConfig.scenarioId + " SUCCESS ===", "color: green;");
                console.log("%c===============", "color: green;");
            } else {
                console.log("%c===============", "color: red;");
                console.log("%c=== SCENARIO " + ReplayUtils.scenarioConfig.scenarioId + " FAILURE ===", "color: red;");
                console.log("%c===============", "color: red;");
            }
            Utils.saveScenarioResult(normalized, result);
            AppUtils.httpPut('replay/e2e/stop').then(() => {
                if (ReplayUtils.scenarioConfig.runAllScenarios === true) {
                    Utils.loadNextScenario(ReplayUtils.scenarioConfig.scenarioId).then((scenario) => {
                        if (scenario.id) {
                            ReplayUtils.scenarioConfig.scenarioId = scenario.id;
                            ACEController.expectedTimeline = JSON.parse(scenario.timeline);
                            Utils.replayE2E(ReplayUtils.scenarioConfig.pauseInMillis, scenario.serverTimeline);
                        }
                    });
                }
            });
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

}

/*       S.D.G.       */


