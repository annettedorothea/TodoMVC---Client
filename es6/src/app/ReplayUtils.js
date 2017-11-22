import ACEController from "../../gen/ace/ACEController";
import AppUtils from "./AppUtils";
import * as App from "./App";

export default class ReplayUtils {

    static actualTimelineChanged(items) {
        const normalized = ReplayUtils.normalizeTimelines(ACEController.expectedTimeline, ACEController.actualTimeline);
        App.container.setState({
            expectedTimeline: normalized.expected,
            actualTimeline: normalized.actual
        });
    }

    static expectedTimelineChanged(items) {
        App.container.setState({
            expectedTimeline: ACEController.expectedTimeline
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
        let elements = document.getElementsByClassName('bug');
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
        App.container.setState({
            expectedTimeline: ACEController.expectedTimeline,
            actualTimeline: ACEController.actualTimeline
        });
        ACEController.startReplay(ACEController.REPLAY, pauseInMillis)
    }

    static e2e(pauseInMillis) {
        let elements = document.getElementsByClassName('bug');
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
        App.container.setState({
            expectedTimeline: ACEController.expectedTimeline,
            actualTimeline: ACEController.actualTimeline
        });
        ACEController.startReplay(ACEController.E2E, pauseInMillis)
    }

    static initFinishReplayCallback(callback) {
        ReplayUtils.finishReplayCallback = callback;
    }

    static initFinishE2ECallback(callback) {
        ReplayUtils.finishE2ECallback = callback;
    }

    static finishReplay(execution) {
        const normalized = ReplayUtils.normalizeTimelines(ACEController.expectedTimeline, ACEController.actualTimeline);
        const result = JSON.stringify(normalized.expected, ReplayUtils.itemStringifyReplacer) === JSON.stringify(normalized.actual, ReplayUtils.itemStringifyReplacer);

        if (execution === ACEController.REPLAY && ReplayUtils.finishReplayCallback) {
            ReplayUtils.finishReplayCallback(result);
        } else if (execution === ACEController.E2E && ReplayUtils.finishE2ECallback) {
            ReplayUtils.finishE2ECallback(result);
        }
    }

    static itemStringifyReplacer(key, value) {
        if (key === 'timestamp') {
            return undefined;
        } else {
            return value;
        }
    }

    static saveScenario(description) {
        const data = {
            description: description,
            data: JSON.stringify(ACEController.timeline)
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
}

/*       S.D.G.       */

