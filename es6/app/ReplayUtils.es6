'use strict';

class ReplayUtils {

    static actualTimelineChanged(items) {
        const normalized = ReplayUtils.normalizeTimelines(ACEController.expectedTimeline, ACEController.actualTimeline);
        container.setState({
            expectedTimeline: normalized.expected,
            actualTimeline: normalized.actual
        });
    }

    static expectedTimelineChanged(items) {
        container.setState({
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
        return new Promise((resolve) => {
            $.ajax({
                url: 'replay/database/reset',
                type: 'delete',
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json'
                },
                success: function () {
                    resolve();
                },
                error: function (jqxhr, textStatus, error) {
                    reject(`reset database failed with ${jqxhr.status}: ${jqxhr.statusText} - ${jqxhr.responseText}`);
                }
            });
        });
    }

    static prepareAction(uuid) {
        if (ACEController.execution === ACEController.E2E) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: 'replay/database/prepare?uuid=' + uuid,
                    type: 'put',
                    headers: {
                        'Accept': 'text/plain',
                        'Content-Type': 'application/json'
                    },
                    success: function () {
                        resolve();
                    },
                    error: function (jqxhr, textStatus, error) {
                        reject(error);
                    }
                });
            });
        } else {
            return new Promise((resolve) => {
                resolve();
            });
        }
    }

    static replay() {
        container.setState({
            expectedTimeline: ACEController.expectedTimeline,
            actualTimeline: ACEController.actualTimeline
        });
        ACEController.startReplay(ACEController.REPLAY, 1000)
    }

    static e2e() {
        ACEController.startReplay(ACEController.E2E, 1000)
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

