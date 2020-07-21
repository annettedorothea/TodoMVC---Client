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
 * generated with de.acegen 0.9.7
 *
 */




import AppUtils from "../../src/app/AppUtils";
import ACEController from "./ACEController";
import ReplayUtils from "../../src/app/ReplayUtils";

export default class Utils {

    static getServerInfo() {
        return AppUtils.httpGet(Utils.getRootPath() + '/server/info');
    }

    static loadSettings() {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Accept", "application/json");

            const options = {
                method: 'GET',
                headers: headers,
                mode: 'cors',
                cache: 'no-cache'
            };

            const request = new Request("settings.json", options);

            fetch(request).then(function (response) {
                return response.json();
            }).then(function (data) {
                resolve(data);
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    static getClientVersion() {
        return Utils.settings ? Utils.settings.clientVersion : "";
    }

    static isDevelopment() {
        return Utils.settings ? Utils.settings.development : false;
    }

    static getAceScenariosApiKey() {
        return Utils.settings ? Utils.settings.aceScenariosApiKey : "";
    }

    static getAceScenariosBaseUrl() {
        return Utils.settings ? Utils.settings.aceScenariosBaseUrl : "";
    }

    static getRootPath() {
        return Utils.settings ? (ACEController.execution !== ACEController.E2E ? Utils.settings.rootPath :  Utils.settings.replayRootPath) : "";
    }

    static getTimelineSize() {
        return Utils.settings ? Utils.settings.timelineSize : 0;
    }

    static saveBug(description, creator) {
        return Utils.getServerInfo().then((serverInfo) => {
            const browser = Utils.getBrowserInfo();
            const uuid = AppUtils.createUUID();
            const data = {
                description,
                timeline: JSON.stringify(ACEController.timeline),
                creator,
                clientVersion: Utils.getClientVersion(),
                device: browser.name + " " + browser.version,
                uuid,
                apiKey: Utils.getAceScenariosApiKey(),
                serverVersion: serverInfo.serverVersion
            };
            return AppUtils.httpPost(Utils.getAceScenariosBaseUrl() + 'api/bugs/create', false, data);
        });
    }

    static loadBug(id) {
        return AppUtils.httpGet(Utils.getAceScenariosBaseUrl() + `api/bugs/get?id=${id}&apiKey=${Utils.getAceScenariosApiKey()}&uuid=${AppUtils.createUUID()}`, false);
    }

    static saveScenario(description, creator) {
        return AppUtils.httpGet(Utils.getRootPath() + '/e2e/timeline').then((serverTimeline) => {
            return Utils.getServerInfo().then((serverInfo) => {
                const browser = Utils.getBrowserInfo();
                const uuid = AppUtils.createUUID();
                const data = {
                    description,
                    timeline: JSON.stringify(ACEController.timeline),
                    serverTimeline: JSON.stringify(serverTimeline),
                    creator,
                    clientVersion: Utils.getClientVersion(),
                    device: browser.name + " " + browser.version,
                    uuid,
                    apiKey: Utils.getAceScenariosApiKey(),
                    serverVersion: serverInfo.serverVersion
                };
                return AppUtils.httpPost(Utils.getAceScenariosBaseUrl() + 'api/scenarios/create', false, data);
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
                    clientVersion: Utils.getClientVersion(),
                    device: browser.name + " " + browser.version,
                    apiKey: Utils.getAceScenariosApiKey(),
                    serverVersion: serverInfo.serverVersion,
                    serverTimeline: JSON.stringify(serverTimeline)
                };
                return AppUtils.httpPost(Utils.getAceScenariosBaseUrl() + 'api/results/create', false, data);
            });
        });
    }

    static loadScenario(id) {
        return AppUtils.httpGet(Utils.getAceScenariosBaseUrl() + `api/scenarios/get?id=${id}&apiKey=${Utils.getAceScenariosApiKey()}&uuid=${AppUtils.createUUID()}`, false);
    }

    static loadNextScenario(lastId) {
        return AppUtils.httpGet(Utils.getAceScenariosBaseUrl() + `api/scenarios/next?lastId=${lastId}&apiKey=${Utils.getAceScenariosApiKey()}&uuid=${AppUtils.createUUID()}`, false);
    }

    static getBrowserInfo() {
        let ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return {name: 'IE ', version: (tem[1] || '')};
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR\/(\d+)/);
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
        AppUtils.createInitialAppState();
        ACEController.startReplay(ACEController.REPLAY, pauseInMillis)
    }

    static replayE2E(pauseInMillis, serverTimeline) {
        ReplayUtils.prepareReplay();
        AppUtils.createInitialAppState();
        AppUtils.httpPut('replay/e2e/start', false, JSON.parse(serverTimeline)).then(() => {
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
        console.log("replay finished");
    	ReplayUtils.tearDownReplay();
    	AppUtils.createInitialAppState();
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
		return "AppState";
    }
    
}




/******* S.D.G. *******/





