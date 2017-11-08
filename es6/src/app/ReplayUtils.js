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
        App.container.setState({
            expectedTimeline: ACEController.expectedTimeline,
            actualTimeline: ACEController.actualTimeline
        });
        ACEController.startReplay(ACEController.REPLAY, pauseInMillis)
    }

    static e2e(pauseInMillis) {
        console.log("pauseInMillis", pauseInMillis);
        App.container.setState({
            expectedTimeline: ACEController.expectedTimeline,
            actualTimeline: ACEController.actualTimeline
        });
        ACEController.startReplay(ACEController.E2E, pauseInMillis)
    }

    static finishReplay() {
    }

    static itemStringifyReplacer(key, value) {
        if (key === 'timestamp') {
            return undefined;
        } else {
            return value;
        }
    }

    static uploadTimeline(event) {
        const input = event.target;
        const reader = new FileReader();
        reader.onload = function () {
            const json = reader.result;
            ACEController.initTimeline(JSON.parse(json));
        };
        reader.readAsText(input.files[0]);
    }


}

/*       S.D.G.       */

