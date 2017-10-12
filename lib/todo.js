'use strict';

/*
 uuid.js - Version 0.3
 JavaScript Class to create a UUID like identifier

 Copyright (C) 2006-2008, Erik Giberti (AF-Design), All rights reserved.

 This program is free software; you can redistribute it and/or modify it under
 the terms of the GNU General Public License as published by the Free Software
 Foundation; either version 2 of the License, or (at your option) any later
 version.

 This program is distributed in the hope that it will be useful, but WITHOUT ANY
 WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 PARTICULAR PURPOSE. See the GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along with
 this program; if not, write to the Free Software Foundation, Inc., 59 Temple
 Place, Suite 330, Boston, MA 02111-1307 USA

 The latest version of this file can be downloaded from
 http://www.af-design.com/resources/javascript_uuid.php

 HISTORY:
 6/5/06 	- Initial Release
 5/22/08 - Updated code to run faster, removed randrange(min,max) in favor of
 a simpler rand(max) function. Reduced overhead by using getTime()
 method of date class (suggestion by James Hall).
 9/5/08	- Fixed a bug with rand(max) and additional efficiencies pointed out
 by Robert Kieffer http://broofa.com/

 KNOWN ISSUES:
 - Still no way to get MAC address in JavaScript
 - Research into other versions of UUID show promising possibilities
 (more research needed)
 - Documentation needs improvement

 */

// On creation of a UUID object, set it's initial value
function UUID() {
    this.id = this.createUUID();
}

// When asked what this Object is, lie and return it's value
UUID.prototype.valueOf = function () {
    return this.id;
};
UUID.prototype.toString = function () {
    return this.id;
};

//
// INSTANCE SPECIFIC METHODS
//

UUID.prototype.createUUID = function () {
    //
    // Loose interpretation of the specification DCE 1.1: Remote Procedure Call
    // described at http://www.opengroup.org/onlinepubs/009629399/apdxa.htm#tagtcjh_37
    // since JavaScript doesn't allow access to internal systems, the last 48 bits
    // of the node section is made up using a series of random numbers (6 octets long).
    //
    var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
    var dc = new Date();
    var t = dc.getTime() - dg.getTime();
    var h = '-';
    var tl = UUID.getIntegerBits(t, 0, 31);
    var tm = UUID.getIntegerBits(t, 32, 47);
    var thv = UUID.getIntegerBits(t, 48, 59) + '1'; // version 1, security version is 2
    var csar = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
    var csl = UUID.getIntegerBits(UUID.rand(4095), 0, 7);

    // since detection of anything about the machine/browser is far to buggy,
    // include some more random numbers here
    // if NIC or an IP can be obtained reliably, that should be put in
    // here instead.
    var n = UUID.getIntegerBits(UUID.rand(8191), 0, 7) + UUID.getIntegerBits(UUID.rand(8191), 8, 15) + UUID.getIntegerBits(UUID.rand(8191), 0, 7) + UUID.getIntegerBits(UUID.rand(8191), 8, 15) + UUID.getIntegerBits(UUID.rand(8191), 0, 15); // this last number is two octets long
    return tl + h + tm + h + thv + h + csar + csl + h + n;
};

//
// GENERAL METHODS (Not instance specific)
//


// Pull out only certain bits from a very large integer, used to get the time
// code information for the first part of a UUID. Will return zero's if there
// aren't enough bits to shift where it needs to.
UUID.getIntegerBits = function (val, start, end) {
    var base16 = UUID.returnBase(val, 16);
    var quadArray = new Array();
    var quadString = '';
    var i = 0;
    for (i = 0; i < base16.length; i++) {
        quadArray.push(base16.substring(i, i + 1));
    }
    for (i = Math.floor(start / 4); i <= Math.floor(end / 4); i++) {
        if (!quadArray[i] || quadArray[i] == '') quadString += '0';else quadString += quadArray[i];
    }
    return quadString;
};

// Replaced from the original function to leverage the built in methods in
// JavaScript. Thanks to Robert Kieffer for pointing this one out
UUID.returnBase = function (number, base) {
    return number.toString(base).toUpperCase();
};

// pick a random number within a range of numbers
// int b rand(int a); where 0 <= b <= a
UUID.rand = function (max) {
    return Math.floor(Math.random() * (max + 1));
};

// end of UUID class file
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppUtils = function () {
    function AppUtils() {
        _classCallCheck(this, AppUtils);
    }

    _createClass(AppUtils, null, [{
        key: 'start',
        value: function start() {
            new InitAction().apply();
        }
    }, {
        key: 'timelineChanged',
        value: function timelineChanged(item) {
            container.setState({
                timeline: ACEController.timeline
            });
        }
    }, {
        key: 'httpGet',
        value: function httpGet(url, queryParams, commandParam) {
            return new Promise(function (resolve, reject) {
                var adjustedUrl = AppUtils.url(url);
                $.ajax({
                    url: adjustedUrl + AppUtils.queryParamString(adjustedUrl, queryParams),
                    type: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    success: function success(data) {
                        resolve(data);
                    },
                    error: function error(jqxhr, textStatus, _error) {
                        reject('GET failed with ' + jqxhr.status + ': ' + jqxhr.statusText + ' - ' + jqxhr.responseText);
                    }
                });
            });
        }
    }, {
        key: 'httpPost',
        value: function httpPost(url, queryParams, data, commandParam) {
            return new Promise(function (resolve, reject) {
                var adjustedUrl = AppUtils.url(url);
                $.ajax({
                    url: adjustedUrl + AppUtils.queryParamString(adjustedUrl, queryParams),
                    type: 'post',
                    data: JSON.stringify(data),
                    headers: {
                        'Accept': 'text/plain',
                        'Content-Type': 'application/json'
                    },
                    success: function success(data) {
                        resolve(data);
                    },
                    error: function error(jqxhr, textStatus, _error2) {
                        reject('POST failed with ' + jqxhr.status + ': ' + jqxhr.statusText + ' - ' + jqxhr.responseText);
                    }
                });
            });
        }
    }, {
        key: 'httpPut',
        value: function httpPut(url, queryParams, data, commandParam) {
            return new Promise(function (resolve, reject) {
                var adjustedUrl = AppUtils.url(url);
                $.ajax({
                    url: adjustedUrl + AppUtils.queryParamString(adjustedUrl, queryParams),
                    type: 'put',
                    data: JSON.stringify(data),
                    headers: {
                        'Accept': 'text/plain',
                        'Content-Type': 'application/json'
                    },
                    success: function success(data) {
                        resolve(data);
                    },
                    error: function error(jqxhr, textStatus, _error3) {
                        reject('PUT failed with ' + jqxhr.status + ': ' + jqxhr.statusText + ' - ' + jqxhr.responseText);
                    }
                });
            });
        }
    }, {
        key: 'httpDelete',
        value: function httpDelete(url, queryParams, data, commandParam) {
            return new Promise(function (resolve, reject) {
                var adjustedUrl = AppUtils.url(url);
                $.ajax({
                    url: adjustedUrl + AppUtils.queryParamString(adjustedUrl, queryParams),
                    type: 'delete',
                    data: JSON.stringify(data),
                    headers: {
                        'Accept': 'text/plain',
                        'Content-Type': 'application/json'
                    },
                    success: function success(data) {
                        resolve(data);
                    },
                    error: function error(jqxhr, textStatus, _error4) {
                        reject('DELETE failed with ' + jqxhr.status + ': ' + jqxhr.statusText + ' - ' + jqxhr.responseText);
                    }
                });
            });
        }
    }, {
        key: 'queryParamString',
        value: function queryParamString(url, queryParams) {
            var queryString = "";
            if (queryParams && queryParams.length > 0) {
                for (var i = 0; i < queryParams.length; i++) {
                    if (url.indexOf('?') < 0 && i === 0) {
                        queryString += '?';
                    } else {
                        queryString += '&';
                    }
                    queryString += queryParams[i].key + "=" + queryParams[i].value;
                }
            }
            return queryString;
        }
    }, {
        key: 'url',
        value: function url(_url) {
            if (ACEController.execution !== ACEController.E2E) {
                return _url;
            } else {
                return _url.replace('api', 'replay');
            }
        }
    }]);

    return AppUtils;
}();

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReplayUtils = function () {
    function ReplayUtils() {
        _classCallCheck(this, ReplayUtils);
    }

    _createClass(ReplayUtils, null, [{
        key: 'actualTimelineChanged',
        value: function actualTimelineChanged(items) {
            var normalized = ReplayUtils.normalizeTimelines(ACEController.expectedTimeline, ACEController.actualTimeline);
            container.setState({
                expectedTimeline: normalized.expected,
                actualTimeline: normalized.actual
            });
        }
    }, {
        key: 'expectedTimelineChanged',
        value: function expectedTimelineChanged(items) {
            container.setState({
                expectedTimeline: ACEController.expectedTimeline
            });
        }
    }, {
        key: 'normalizeTimelines',
        value: function normalizeTimelines(expected, actual) {
            var normalizedExpected = [];
            var normalizedActual = [];
            var expectedIndex = 0;
            var actualIndex = 0;
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
    }, {
        key: 'resetDatabase',
        value: function resetDatabase() {
            return new Promise(function (resolve) {
                $.ajax({
                    url: 'replay/database/reset',
                    type: 'delete',
                    headers: {
                        'Accept': 'text/plain',
                        'Content-Type': 'application/json'
                    },
                    success: function success() {
                        resolve();
                    },
                    error: function error(jqxhr, textStatus, _error) {
                        reject('reset database failed with ' + jqxhr.status + ': ' + jqxhr.statusText + ' - ' + jqxhr.responseText);
                    }
                });
            });
        }
    }, {
        key: 'prepareAction',
        value: function prepareAction(uuid) {
            if (ACEController.execution === ACEController.E2E) {
                return new Promise(function (resolve, reject) {
                    $.ajax({
                        url: 'replay/database/prepare?uuid=' + uuid,
                        type: 'put',
                        headers: {
                            'Accept': 'text/plain',
                            'Content-Type': 'application/json'
                        },
                        success: function success() {
                            resolve();
                        },
                        error: function error(jqxhr, textStatus, _error2) {
                            reject(_error2);
                        }
                    });
                });
            } else {
                return new Promise(function (resolve) {
                    resolve();
                });
            }
        }
    }, {
        key: 'replay',
        value: function replay() {
            container.setState({
                expectedTimeline: ACEController.expectedTimeline,
                actualTimeline: ACEController.actualTimeline
            });
            ACEController.startReplay(ACEController.REPLAY, 1000);
        }
    }, {
        key: 'e2e',
        value: function e2e() {
            ACEController.startReplay(ACEController.E2E, 1000);
        }
    }, {
        key: 'finishReplay',
        value: function finishReplay() {}
    }, {
        key: 'itemStringifyReplacer',
        value: function itemStringifyReplacer(key, value) {
            if (key === 'timestamp') {
                return undefined;
            } else {
                return value;
            }
        }
    }, {
        key: 'uploadTimeline',
        value: function uploadTimeline(event) {
            var input = event.target;
            var reader = new FileReader();
            reader.onload = function () {
                var json = reader.result;
                ACEController.initTimeline(JSON.parse(json));
            };
            reader.readAsText(input.files[0]);
        }
    }]);

    return ReplayUtils;
}();

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ACEController = function () {
    function ACEController() {
        _classCallCheck(this, ACEController);
    }

    _createClass(ACEController, null, [{
        key: 'init',
        value: function init() {
            ACEController.timeline = [];
            ACEController.listeners = {};
            ACEController.registerListener('TriggerAction', ACEController.triggerAction);
            ACEController.actionIsProcessing = false;
            ACEController.actionQueue = [];
            ACEController.uuidGenerator = new UUID();
            ACEController.LIVE = 1;
            ACEController.REPLAY = 2;
            ACEController.E2E = 3;
            ACEController.execution = ACEController.LIVE;
            ACEController.actualTimeline = [];
            ACEController.expectedTimeline = [];
            ACEController.timelineSize = 200;
        }
    }, {
        key: 'registerListener',
        value: function registerListener(eventName, listener) {
            if (!eventName.trim()) {
                throw new Error('cannot register listener for empty eventName');
            }
            if (!listener) {
                throw new Error('cannot register undefined listener for event ' + eventName);
            }
            var listenersForEventName = void 0;
            if (ACEController.listeners[eventName] === undefined) {
                ACEController.listeners[eventName] = [];
            }
            listenersForEventName = ACEController.listeners[eventName];
            listenersForEventName.push(listener);
        }
    }, {
        key: 'addItemToTimeLine',
        value: function addItemToTimeLine(item) {
            var timestamp = new Date();
            item.timestamp = timestamp.getTime();
            if (ACEController.execution === ACEController.LIVE) {
                ACEController.timeline.push(JSON.parse(JSON.stringify(item)));
                if (ACEController.timeline.length > ACEController.timelineSize) {
                    var i = void 0;
                    for (i = 1; i < ACEController.timeline.length; i++) {
                        if (ACEController.timeline[i].action && ACEController.timeline[i].action.isInitAction) {
                            break;
                        }
                    }
                    if (i < ACEController.timeline.length) {
                        for (var j = 0; j < i; j++) {
                            ACEController.timeline.shift();
                        }
                    }
                }
                AppUtils.timelineChanged([item]);
            } else {
                ACEController.actualTimeline.push(JSON.parse(JSON.stringify(item)));
                ReplayUtils.actualTimelineChanged([item]);
            }
        }
    }, {
        key: 'downloadTimeline',
        value: function downloadTimeline() {
            var timelineJson = JSON.stringify(ACEController.timeline, null, 2);

            var a = window.document.createElement('a');
            a.href = window.URL.createObjectURL(new Blob([timelineJson], { type: 'text/json' }));
            a.download = 'scenario.json';

            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
        }
    }, {
        key: 'initTimeline',
        value: function initTimeline(timelineJson) {
            ACEController.expectedTimeline = timelineJson;
            ReplayUtils.expectedTimelineChanged(ACEController.expectedTimeline);
            ACEController.actualTimeline = [];
            ReplayUtils.actualTimelineChanged([]);
        }
    }, {
        key: 'addActionToQueue',
        value: function addActionToQueue(action) {
            if (ACEController.execution === ACEController.LIVE) {
                ACEController.actionQueue.push(action);
                if (ACEController.actionIsProcessing === false) {
                    ACEController.actionIsProcessing = true;
                    ACEController.applyNextActions();
                }
            }
        }
    }, {
        key: 'applyNextActions',
        value: function applyNextActions() {
            var action = ACEController.actionQueue.shift();
            if (action) {
                action.applyAction().then(function () {}, function (error) {
                    ACEController.actionIsProcessing = false;
                    throw new Error(error + " when applying action " + action.actionName);
                });
            } else if (action === undefined) {
                ACEController.actionIsProcessing = false;
                if (ACEController.execution !== ACEController.LIVE) {
                    ReplayUtils.finishReplay();
                    ACEController.timeline = [];
                    ACEController.actionIsProcessing = false;
                    ACEController.actionQueue = [];
                    ACEController.execution = ACEController.LIVE;
                    AppUtils.start();
                }
            }
        }
    }, {
        key: 'triggerAction',
        value: function triggerAction(action) {
            ACEController.addActionToQueue(action);
        }
    }, {
        key: 'replay',
        value: function replay(pauseInMillis) {
            ACEController.startReplay(ACEController.REPLAY, pauseInMillis);
        }
    }, {
        key: 'e2e',
        value: function e2e(pauseInMillis) {
            ACEController.startReplay(ACEController.E2E, pauseInMillis);
        }
    }, {
        key: 'startReplay',
        value: function startReplay(level, pauseInMillis) {
            ACEController.passed = undefined;
            ACEController.actualTimeline = [];
            ACEController.pauseInMillis = undefined;
            ACEController.execution = level;
            ACEController.pauseInMillis = pauseInMillis;

            ReplayUtils.actualTimelineChanged([]);

            if (ACEController.execution === ACEController.REPLAY) {
                ACEController.readTimelineAndCreateReplayActions();
            } else {
                ReplayUtils.resetDatabase().then(function () {
                    ACEController.readTimelineAndCreateReplayActions();
                }, function (error) {
                    throw error;
                });
            }
        }
    }, {
        key: 'readTimelineAndCreateReplayActions',
        value: function readTimelineAndCreateReplayActions() {
            var actions = [];
            if (ACEController.expectedTimeline.length === 0) {
                for (var i = 0; i < ACEController.timeline.length; i++) {
                    var item = ACEController.timeline[i];
                    ACEController.expectedTimeline.push(item);
                }
            }

            ReplayUtils.expectedTimelineChanged(ACEController.expectedTimeline);

            for (var _i = 0; _i < ACEController.expectedTimeline.length; _i++) {
                var _item = ACEController.expectedTimeline[_i];
                if (_item.action) {
                    var actionParam = _item.action.actionParam;
                    var action = eval('new ' + _item.action.actionName + '(actionParam)');
                    action.actionData.uuid = _item.action.actionData.uuid;
                    actions.push(action);
                }
            }

            ACEController.actionQueue = actions;

            ACEController.applyNextActions();
        }
    }, {
        key: 'getCommandByUuid',
        value: function getCommandByUuid(uuid) {
            for (var i = 0; i < ACEController.expectedTimeline.length; i++) {
                var item = ACEController.expectedTimeline[i];
                if (item.command && item.command.commandParam.uuid === uuid) {
                    return item.command;
                }
            }
        }
    }]);

    return ACEController;
}();

ACEController.init();

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Action = function () {
    function Action(actionParam, actionName, isInitAction) {
        _classCallCheck(this, Action);

        this.actionName = actionName;
        if (actionParam === undefined) {
            actionParam = {};
        }
        this.actionParam = JSON.parse(JSON.stringify(actionParam));
        this.actionData = {};
        this.isInitAction = isInitAction === true;
    }

    _createClass(Action, [{
        key: "captureActionParam",
        value: function captureActionParam() {}
    }, {
        key: "releaseActionParam",
        value: function releaseActionParam() {}
    }, {
        key: "initActionData",
        value: function initActionData() {}
    }, {
        key: "getCommand",
        value: function getCommand() {
            throw "no command defined for " + this.actionName;
        }
    }, {
        key: "apply",
        value: function apply() {
            ACEController.addActionToQueue(this);
        }
    }, {
        key: "applyAction",
        value: function applyAction() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                if (ACEController.execution === ACEController.LIVE) {
                    _this.actionData.uuid = ACEController.uuidGenerator.createUUID();
                }
                if (ACEController.execution === ACEController.LIVE) {
                    _this.captureActionParam();
                } else {
                    _this.releaseActionParam();
                }
                _this.initActionData();
                ACEController.addItemToTimeLine({ action: _this });
                var command = _this.getCommand();
                if (command) {
                    command.executeCommand().then(function () {
                        resolve();
                    }, function (error) {
                        reject(error + " when executing command " + command.commandName);
                    });
                } else {
                    resolve();
                }
            });
        }
    }]);

    return Action;
}();

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Command = function () {
    function Command(commandParam, commandName) {
        _classCallCheck(this, Command);

        this.commandName = commandName;
        this.commandParam = JSON.parse(JSON.stringify(commandParam));
        this.commandData = {};
    }

    _createClass(Command, [{
        key: "execute",
        value: function execute() {
            throw "no execute method defined for " + this.commandName;
        }
    }, {
        key: "publishEvents",
        value: function publishEvents() {
            throw "no publishEvents method defined for " + this.commandName;
        }
    }, {
        key: "executeCommand",
        value: function executeCommand() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                if (ACEController.execution !== ACEController.REPLAY) {
                    _this.execute().then(function () {
                        ACEController.addItemToTimeLine({ command: _this });
                        _this.publishEvents().then(function () {
                            if (ACEController.execution === ACEController.LIVE) {
                                ACEController.applyNextActions();
                            } else {
                                setTimeout(ACEController.applyNextActions, ACEController.pauseInMillis);
                            }
                            resolve();
                        }, function (error) {
                            reject(error + " when publishing events of command " + _this.commandName);
                        });
                    }, function (error) {
                        reject(error + " when executing command " + _this.commandName);
                    });
                } else {
                    var timelineCommand = ACEController.getCommandByUuid(_this.commandParam.uuid);
                    _this.commandData = timelineCommand.commandData;
                    ACEController.addItemToTimeLine({ command: _this });
                    _this.publishEvents().then(function () {
                        setTimeout(ACEController.applyNextActions, ACEController.pauseInMillis);
                        resolve();
                    }, function (error) {
                        reject(error + " when publishing events of command " + _this.commandName);
                    });
                }
            });
        }
    }, {
        key: "httpGet",
        value: function httpGet(url, queryParams) {
            var _this2 = this;

            return ReplayUtils.prepareAction(this.commandParam.uuid).then(function () {
                queryParams = _this2.addUuidToQueryParams(queryParams);
                return AppUtils.httpGet(url, queryParams, _this2.commandParam);
            }, function (error) {
                reject(error);
            });
        }
    }, {
        key: "httpPost",
        value: function httpPost(url, queryParams, data) {
            var _this3 = this;

            return ReplayUtils.prepareAction(this.commandParam.uuid).then(function () {
                queryParams = _this3.addUuidToQueryParams(queryParams);
                data = _this3.addUuidToData(data);
                return AppUtils.httpPost(url, queryParams, data, _this3.commandParam);
            }, function (error) {
                reject(error);
            });
        }
    }, {
        key: "httpPut",
        value: function httpPut(url, queryParams, data) {
            var _this4 = this;

            return ReplayUtils.prepareAction(this.commandParam.uuid).then(function () {
                queryParams = _this4.addUuidToQueryParams(queryParams);
                data = _this4.addUuidToData(data);
                return AppUtils.httpPut(url, queryParams, data, _this4.commandParam);
            }, function (error) {
                reject(error);
            });
        }
    }, {
        key: "httpDelete",
        value: function httpDelete(url, queryParams, data) {
            var _this5 = this;

            return ReplayUtils.prepareAction(this.commandParam.uuid).then(function () {
                queryParams = _this5.addUuidToQueryParams(queryParams);
                data = _this5.addUuidToData(data);
                return AppUtils.httpDelete(url, queryParams, data, _this5.commandParam);
            }, function (error) {
                reject(error);
            });
        }
    }, {
        key: "addUuidToQueryParams",
        value: function addUuidToQueryParams(queryParams) {
            if (!queryParams) {
                queryParams = [];
            }
            if (this.commandParam.uuid) {
                queryParams.push({
                    key: "uuid",
                    value: this.commandParam.uuid
                });
            }
            return queryParams;
        }
    }, {
        key: "addUuidToData",
        value: function addUuidToData(data) {
            if (!data) {
                data = {};
            }
            if (this.commandParam.uuid) {
                data.uuid = this.commandParam.uuid;
            }
            return data;
        }
    }]);

    return Command;
}();

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function () {
    function Event(eventParam, eventName) {
        _classCallCheck(this, Event);

        this.eventName = eventName;
        this.eventParam = eventParam;
    }

    _createClass(Event, [{
        key: "prepareDataForView",
        value: function prepareDataForView() {
            throw "no prepareDataForView method defined for " + this.eventName;
        }
    }, {
        key: "publish",
        value: function publish() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this.prepareDataForView();
                ACEController.addItemToTimeLine({ event: _this });
                Promise.all(_this.notifyListeners()).then(function () {
                    resolve();
                }, function (error) {
                    reject(error + " when notifying listeners of event " + _this.eventName);
                });
            });
        }
    }, {
        key: "notifyListeners",
        value: function notifyListeners() {
            var promises = [];
            var i, listener;
            if (this.eventName !== undefined) {
                var listenersForEvent = ACEController.listeners[this.eventName];
                if (listenersForEvent !== undefined) {
                    for (i = 0; i < listenersForEvent.length; i += 1) {
                        listener = listenersForEvent[i];
                        promises.push(listener(this.eventData));
                    }
                }
            }
            return promises;
        }
    }]);

    return Event;
}();

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TriggerAction = function (_Event) {
    _inherits(TriggerAction, _Event);

    function TriggerAction(action) {
        _classCallCheck(this, TriggerAction);

        var _this = _possibleConstructorReturn(this, (TriggerAction.__proto__ || Object.getPrototypeOf(TriggerAction)).call(this, action, 'TriggerAction'));

        _this.eventData = action;
        return _this;
    }

    _createClass(TriggerAction, [{
        key: 'prepareDataForView',
        value: function prepareDataForView() {}
    }]);

    return TriggerAction;
}(Event);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractClearDoneAction = function (_Action) {
  _inherits(AbstractClearDoneAction, _Action);

  function AbstractClearDoneAction(actionParam) {
    _classCallCheck(this, AbstractClearDoneAction);

    return _possibleConstructorReturn(this, (AbstractClearDoneAction.__proto__ || Object.getPrototypeOf(AbstractClearDoneAction)).call(this, actionParam, 'ClearDoneAction', false));
  }

  _createClass(AbstractClearDoneAction, [{
    key: 'getCommand',
    value: function getCommand() {
      return new ClearDoneCommand(this.actionData);
    }
  }]);

  return AbstractClearDoneAction;
}(Action);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractCreateTodoAction = function (_Action) {
  _inherits(AbstractCreateTodoAction, _Action);

  function AbstractCreateTodoAction(actionParam) {
    _classCallCheck(this, AbstractCreateTodoAction);

    return _possibleConstructorReturn(this, (AbstractCreateTodoAction.__proto__ || Object.getPrototypeOf(AbstractCreateTodoAction)).call(this, actionParam, 'CreateTodoAction', false));
  }

  _createClass(AbstractCreateTodoAction, [{
    key: 'getCommand',
    value: function getCommand() {
      return new CreateTodoCommand(this.actionData);
    }
  }]);

  return AbstractCreateTodoAction;
}(Action);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractDeleteTodoAction = function (_Action) {
  _inherits(AbstractDeleteTodoAction, _Action);

  function AbstractDeleteTodoAction(actionParam) {
    _classCallCheck(this, AbstractDeleteTodoAction);

    return _possibleConstructorReturn(this, (AbstractDeleteTodoAction.__proto__ || Object.getPrototypeOf(AbstractDeleteTodoAction)).call(this, actionParam, 'DeleteTodoAction', false));
  }

  _createClass(AbstractDeleteTodoAction, [{
    key: 'getCommand',
    value: function getCommand() {
      return new DeleteTodoCommand(this.actionData);
    }
  }]);

  return AbstractDeleteTodoAction;
}(Action);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEditTodoAction = function (_Action) {
  _inherits(AbstractEditTodoAction, _Action);

  function AbstractEditTodoAction(actionParam) {
    _classCallCheck(this, AbstractEditTodoAction);

    return _possibleConstructorReturn(this, (AbstractEditTodoAction.__proto__ || Object.getPrototypeOf(AbstractEditTodoAction)).call(this, actionParam, 'EditTodoAction', false));
  }

  _createClass(AbstractEditTodoAction, [{
    key: 'getCommand',
    value: function getCommand() {
      return new EditTodoCommand(this.actionData);
    }
  }]);

  return AbstractEditTodoAction;
}(Action);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractGetTodoListAction = function (_Action) {
  _inherits(AbstractGetTodoListAction, _Action);

  function AbstractGetTodoListAction(actionParam) {
    _classCallCheck(this, AbstractGetTodoListAction);

    return _possibleConstructorReturn(this, (AbstractGetTodoListAction.__proto__ || Object.getPrototypeOf(AbstractGetTodoListAction)).call(this, actionParam, 'GetTodoListAction', false));
  }

  _createClass(AbstractGetTodoListAction, [{
    key: 'getCommand',
    value: function getCommand() {
      return new GetTodoListCommand(this.actionData);
    }
  }]);

  return AbstractGetTodoListAction;
}(Action);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractInitAction = function (_Action) {
  _inherits(AbstractInitAction, _Action);

  function AbstractInitAction(actionParam) {
    _classCallCheck(this, AbstractInitAction);

    return _possibleConstructorReturn(this, (AbstractInitAction.__proto__ || Object.getPrototypeOf(AbstractInitAction)).call(this, actionParam, 'InitAction', true));
  }

  _createClass(AbstractInitAction, [{
    key: 'getCommand',
    value: function getCommand() {
      return new InitCommand(this.actionData);
    }
  }]);

  return AbstractInitAction;
}(Action);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractToggleAllAction = function (_Action) {
  _inherits(AbstractToggleAllAction, _Action);

  function AbstractToggleAllAction(actionParam) {
    _classCallCheck(this, AbstractToggleAllAction);

    return _possibleConstructorReturn(this, (AbstractToggleAllAction.__proto__ || Object.getPrototypeOf(AbstractToggleAllAction)).call(this, actionParam, 'ToggleAllAction', false));
  }

  _createClass(AbstractToggleAllAction, [{
    key: 'getCommand',
    value: function getCommand() {
      return new ToggleAllCommand(this.actionData);
    }
  }]);

  return AbstractToggleAllAction;
}(Action);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractToggleTodoAction = function (_Action) {
  _inherits(AbstractToggleTodoAction, _Action);

  function AbstractToggleTodoAction(actionParam) {
    _classCallCheck(this, AbstractToggleTodoAction);

    return _possibleConstructorReturn(this, (AbstractToggleTodoAction.__proto__ || Object.getPrototypeOf(AbstractToggleTodoAction)).call(this, actionParam, 'ToggleTodoAction', false));
  }

  _createClass(AbstractToggleTodoAction, [{
    key: 'getCommand',
    value: function getCommand() {
      return new ToggleTodoCommand(this.actionData);
    }
  }]);

  return AbstractToggleTodoAction;
}(Action);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractUpdateTodoAction = function (_Action) {
  _inherits(AbstractUpdateTodoAction, _Action);

  function AbstractUpdateTodoAction(actionParam) {
    _classCallCheck(this, AbstractUpdateTodoAction);

    return _possibleConstructorReturn(this, (AbstractUpdateTodoAction.__proto__ || Object.getPrototypeOf(AbstractUpdateTodoAction)).call(this, actionParam, 'UpdateTodoAction', false));
  }

  _createClass(AbstractUpdateTodoAction, [{
    key: 'getCommand',
    value: function getCommand() {
      return new UpdateTodoCommand(this.actionData);
    }
  }]);

  return AbstractUpdateTodoAction;
}(Action);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractClearDoneCommand = function (_Command) {
    _inherits(AbstractClearDoneCommand, _Command);

    function AbstractClearDoneCommand(commandParam) {
        _classCallCheck(this, AbstractClearDoneCommand);

        var _this = _possibleConstructorReturn(this, (AbstractClearDoneCommand.__proto__ || Object.getPrototypeOf(AbstractClearDoneCommand)).call(this, commandParam, "ClearDoneCommand"));

        _this.ok = "ok";
        _this.error = "error";
        return _this;
    }

    _createClass(AbstractClearDoneCommand, [{
        key: "publishEvents",
        value: function publishEvents() {
            var promises = [];

            switch (this.commandData.outcome) {
                case this.ok:
                    promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
                    break;
                case this.error:
                    promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
                    break;
                default:
                    throw 'unhandled outcome: ' + this.commandData.outcome;
            }
            return Promise.all(promises);
        }
    }]);

    return AbstractClearDoneCommand;
}(Command);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractCreateTodoCommand = function (_Command) {
    _inherits(AbstractCreateTodoCommand, _Command);

    function AbstractCreateTodoCommand(commandParam) {
        _classCallCheck(this, AbstractCreateTodoCommand);

        var _this = _possibleConstructorReturn(this, (AbstractCreateTodoCommand.__proto__ || Object.getPrototypeOf(AbstractCreateTodoCommand)).call(this, commandParam, "CreateTodoCommand"));

        _this.ok = "ok";
        _this.error = "error";
        _this.empty = "empty";
        return _this;
    }

    _createClass(AbstractCreateTodoCommand, [{
        key: "publishEvents",
        value: function publishEvents() {
            var promises = [];

            switch (this.commandData.outcome) {
                case this.ok:
                    promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
                    break;
                case this.error:
                    promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
                    break;
                case this.empty:
                    break;
                default:
                    throw 'unhandled outcome: ' + this.commandData.outcome;
            }
            return Promise.all(promises);
        }
    }]);

    return AbstractCreateTodoCommand;
}(Command);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractDeleteTodoCommand = function (_Command) {
    _inherits(AbstractDeleteTodoCommand, _Command);

    function AbstractDeleteTodoCommand(commandParam) {
        _classCallCheck(this, AbstractDeleteTodoCommand);

        var _this = _possibleConstructorReturn(this, (AbstractDeleteTodoCommand.__proto__ || Object.getPrototypeOf(AbstractDeleteTodoCommand)).call(this, commandParam, "DeleteTodoCommand"));

        _this.ok = "ok";
        _this.error = "error";
        return _this;
    }

    _createClass(AbstractDeleteTodoCommand, [{
        key: "publishEvents",
        value: function publishEvents() {
            var promises = [];

            switch (this.commandData.outcome) {
                case this.ok:
                    promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
                    break;
                case this.error:
                    promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
                    break;
                default:
                    throw 'unhandled outcome: ' + this.commandData.outcome;
            }
            return Promise.all(promises);
        }
    }]);

    return AbstractDeleteTodoCommand;
}(Command);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEditTodoCommand = function (_Command) {
    _inherits(AbstractEditTodoCommand, _Command);

    function AbstractEditTodoCommand(commandParam) {
        _classCallCheck(this, AbstractEditTodoCommand);

        var _this = _possibleConstructorReturn(this, (AbstractEditTodoCommand.__proto__ || Object.getPrototypeOf(AbstractEditTodoCommand)).call(this, commandParam, "EditTodoCommand"));

        _this.ok = "ok";
        return _this;
    }

    _createClass(AbstractEditTodoCommand, [{
        key: "publishEvents",
        value: function publishEvents() {
            var promises = [];

            switch (this.commandData.outcome) {
                case this.ok:
                    promises.push(new EditTodoEvent(this.commandData).publish());
                    break;
                default:
                    throw 'unhandled outcome: ' + this.commandData.outcome;
            }
            return Promise.all(promises);
        }
    }]);

    return AbstractEditTodoCommand;
}(Command);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractGetTodoListCommand = function (_Command) {
    _inherits(AbstractGetTodoListCommand, _Command);

    function AbstractGetTodoListCommand(commandParam) {
        _classCallCheck(this, AbstractGetTodoListCommand);

        var _this = _possibleConstructorReturn(this, (AbstractGetTodoListCommand.__proto__ || Object.getPrototypeOf(AbstractGetTodoListCommand)).call(this, commandParam, "GetTodoListCommand"));

        _this.ok = "ok";
        _this.error = "error";
        return _this;
    }

    _createClass(AbstractGetTodoListCommand, [{
        key: "publishEvents",
        value: function publishEvents() {
            var promises = [];

            switch (this.commandData.outcome) {
                case this.ok:
                    promises.push(new RenderListEvent(this.commandData).publish());
                    break;
                case this.error:
                    break;
                default:
                    throw 'unhandled outcome: ' + this.commandData.outcome;
            }
            return Promise.all(promises);
        }
    }]);

    return AbstractGetTodoListCommand;
}(Command);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractInitCommand = function (_Command) {
    _inherits(AbstractInitCommand, _Command);

    function AbstractInitCommand(commandParam) {
        _classCallCheck(this, AbstractInitCommand);

        var _this = _possibleConstructorReturn(this, (AbstractInitCommand.__proto__ || Object.getPrototypeOf(AbstractInitCommand)).call(this, commandParam, "InitCommand"));

        _this.all = "all";
        _this.done = "done";
        _this.open = "open";
        return _this;
    }

    _createClass(AbstractInitCommand, [{
        key: "publishEvents",
        value: function publishEvents() {
            var promises = [];

            switch (this.commandData.outcome) {
                case this.all:
                    promises.push(new InitFilterEvent(this.commandData).publish());
                    promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
                    break;
                case this.done:
                    promises.push(new InitFilterEvent(this.commandData).publish());
                    promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
                    break;
                case this.open:
                    promises.push(new InitFilterEvent(this.commandData).publish());
                    promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
                    break;
                default:
                    throw 'unhandled outcome: ' + this.commandData.outcome;
            }
            return Promise.all(promises);
        }
    }]);

    return AbstractInitCommand;
}(Command);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractToggleAllCommand = function (_Command) {
    _inherits(AbstractToggleAllCommand, _Command);

    function AbstractToggleAllCommand(commandParam) {
        _classCallCheck(this, AbstractToggleAllCommand);

        var _this = _possibleConstructorReturn(this, (AbstractToggleAllCommand.__proto__ || Object.getPrototypeOf(AbstractToggleAllCommand)).call(this, commandParam, "ToggleAllCommand"));

        _this.ok = "ok";
        _this.error = "error";
        return _this;
    }

    _createClass(AbstractToggleAllCommand, [{
        key: "publishEvents",
        value: function publishEvents() {
            var promises = [];

            switch (this.commandData.outcome) {
                case this.ok:
                    promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
                    break;
                case this.error:
                    promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
                    break;
                default:
                    throw 'unhandled outcome: ' + this.commandData.outcome;
            }
            return Promise.all(promises);
        }
    }]);

    return AbstractToggleAllCommand;
}(Command);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractToggleTodoCommand = function (_Command) {
    _inherits(AbstractToggleTodoCommand, _Command);

    function AbstractToggleTodoCommand(commandParam) {
        _classCallCheck(this, AbstractToggleTodoCommand);

        var _this = _possibleConstructorReturn(this, (AbstractToggleTodoCommand.__proto__ || Object.getPrototypeOf(AbstractToggleTodoCommand)).call(this, commandParam, "ToggleTodoCommand"));

        _this.ok = "ok";
        _this.error = "error";
        return _this;
    }

    _createClass(AbstractToggleTodoCommand, [{
        key: "publishEvents",
        value: function publishEvents() {
            var promises = [];

            switch (this.commandData.outcome) {
                case this.ok:
                    promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
                    break;
                case this.error:
                    promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
                    break;
                default:
                    throw 'unhandled outcome: ' + this.commandData.outcome;
            }
            return Promise.all(promises);
        }
    }]);

    return AbstractToggleTodoCommand;
}(Command);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractUpdateTodoCommand = function (_Command) {
    _inherits(AbstractUpdateTodoCommand, _Command);

    function AbstractUpdateTodoCommand(commandParam) {
        _classCallCheck(this, AbstractUpdateTodoCommand);

        var _this = _possibleConstructorReturn(this, (AbstractUpdateTodoCommand.__proto__ || Object.getPrototypeOf(AbstractUpdateTodoCommand)).call(this, commandParam, "UpdateTodoCommand"));

        _this.ok = "ok";
        _this.error = "error";
        _this.empty = "empty";
        return _this;
    }

    _createClass(AbstractUpdateTodoCommand, [{
        key: "publishEvents",
        value: function publishEvents() {
            var promises = [];

            switch (this.commandData.outcome) {
                case this.ok:
                    promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
                    break;
                case this.error:
                    promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
                    break;
                case this.empty:
                    break;
                default:
                    throw 'unhandled outcome: ' + this.commandData.outcome;
            }
            return Promise.all(promises);
        }
    }]);

    return AbstractUpdateTodoCommand;
}(Command);

/*       S.D.G.       */
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractEditTodoEvent = function (_Event) {
    _inherits(AbstractEditTodoEvent, _Event);

    function AbstractEditTodoEvent(eventParam) {
        _classCallCheck(this, AbstractEditTodoEvent);

        return _possibleConstructorReturn(this, (AbstractEditTodoEvent.__proto__ || Object.getPrototypeOf(AbstractEditTodoEvent)).call(this, eventParam, 'EditTodoEvent'));
    }

    return AbstractEditTodoEvent;
}(Event);

/*       S.D.G.       */
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractInitFilterEvent = function (_Event) {
    _inherits(AbstractInitFilterEvent, _Event);

    function AbstractInitFilterEvent(eventParam) {
        _classCallCheck(this, AbstractInitFilterEvent);

        return _possibleConstructorReturn(this, (AbstractInitFilterEvent.__proto__ || Object.getPrototypeOf(AbstractInitFilterEvent)).call(this, eventParam, 'InitFilterEvent'));
    }

    return AbstractInitFilterEvent;
}(Event);

/*       S.D.G.       */
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractRenderListEvent = function (_Event) {
    _inherits(AbstractRenderListEvent, _Event);

    function AbstractRenderListEvent(eventParam) {
        _classCallCheck(this, AbstractRenderListEvent);

        return _possibleConstructorReturn(this, (AbstractRenderListEvent.__proto__ || Object.getPrototypeOf(AbstractRenderListEvent)).call(this, eventParam, 'RenderListEvent'));
    }

    return AbstractRenderListEvent;
}(Event);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FooterView = function () {
    function FooterView() {
        _classCallCheck(this, FooterView);
    }

    _createClass(FooterView, null, [{
        key: 'initFilter',
        value: function initFilter(eventData) {
            container.setState({
                filter: eventData.filter
            });
        }
    }]);

    return FooterView;
}();

/*                    S.D.G.                    */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TodoView = function () {
    function TodoView() {
        _classCallCheck(this, TodoView);
    }

    _createClass(TodoView, null, [{
        key: 'list',
        value: function list(eventData) {
            container.setState({
                todoList: eventData.data.todoList
            });
        }
    }, {
        key: 'edit',
        value: function edit(eventData) {
            var todoList = Object.assign([], container.state.todoList);
            var todo = todoList.find(function (todo) {
                return todo.id === eventData.id;
            });
            todo.editable = true;
            container.setState({
                todoList: todoList
            });
        }
    }]);

    return TodoView;
}();

/*                    S.D.G.                    */
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClearDoneAction = function (_AbstractClearDoneAct) {
  _inherits(ClearDoneAction, _AbstractClearDoneAct);

  function ClearDoneAction() {
    _classCallCheck(this, ClearDoneAction);

    return _possibleConstructorReturn(this, (ClearDoneAction.__proto__ || Object.getPrototypeOf(ClearDoneAction)).apply(this, arguments));
  }

  return ClearDoneAction;
}(AbstractClearDoneAction);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreateTodoAction = function (_AbstractCreateTodoAc) {
    _inherits(CreateTodoAction, _AbstractCreateTodoAc);

    function CreateTodoAction() {
        _classCallCheck(this, CreateTodoAction);

        return _possibleConstructorReturn(this, (CreateTodoAction.__proto__ || Object.getPrototypeOf(CreateTodoAction)).apply(this, arguments));
    }

    _createClass(CreateTodoAction, [{
        key: 'initActionData',
        value: function initActionData() {
            this.actionData.description = this.actionParam.description;
        }
    }]);

    return CreateTodoAction;
}(AbstractCreateTodoAction);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeleteTodoAction = function (_AbstractDeleteTodoAc) {
    _inherits(DeleteTodoAction, _AbstractDeleteTodoAc);

    function DeleteTodoAction() {
        _classCallCheck(this, DeleteTodoAction);

        return _possibleConstructorReturn(this, (DeleteTodoAction.__proto__ || Object.getPrototypeOf(DeleteTodoAction)).apply(this, arguments));
    }

    _createClass(DeleteTodoAction, [{
        key: 'initActionData',
        value: function initActionData() {
            this.actionData.id = this.actionParam.id;
        }
    }]);

    return DeleteTodoAction;
}(AbstractDeleteTodoAction);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditTodoAction = function (_AbstractEditTodoActi) {
    _inherits(EditTodoAction, _AbstractEditTodoActi);

    function EditTodoAction() {
        _classCallCheck(this, EditTodoAction);

        return _possibleConstructorReturn(this, (EditTodoAction.__proto__ || Object.getPrototypeOf(EditTodoAction)).apply(this, arguments));
    }

    _createClass(EditTodoAction, [{
        key: 'initActionData',
        value: function initActionData() {
            this.actionData.id = this.actionParam.id;
        }
    }]);

    return EditTodoAction;
}(AbstractEditTodoAction);

/*       S.D.G.       */
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GetTodoListAction = function (_AbstractGetTodoListA) {
  _inherits(GetTodoListAction, _AbstractGetTodoListA);

  function GetTodoListAction() {
    _classCallCheck(this, GetTodoListAction);

    return _possibleConstructorReturn(this, (GetTodoListAction.__proto__ || Object.getPrototypeOf(GetTodoListAction)).apply(this, arguments));
  }

  return GetTodoListAction;
}(AbstractGetTodoListAction);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InitAction = function (_AbstractInitAction) {
    _inherits(InitAction, _AbstractInitAction);

    function InitAction(actionParam) {
        _classCallCheck(this, InitAction);

        return _possibleConstructorReturn(this, (InitAction.__proto__ || Object.getPrototypeOf(InitAction)).call(this, actionParam, true));
    }

    _createClass(InitAction, [{
        key: 'captureActionParam',
        value: function captureActionParam() {
            this.actionParam.hash = window.location.hash.substring(1);
        }
    }, {
        key: 'initActionData',
        value: function initActionData() {
            this.actionData.hash = this.actionParam.hash;
        }
    }, {
        key: 'releaseActionParam',
        value: function releaseActionParam() {
            window.location.hash = this.actionParam.hash;
        }
    }]);

    return InitAction;
}(AbstractInitAction);

/*       S.D.G.       */
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToggleAllAction = function (_AbstractToggleAllAct) {
  _inherits(ToggleAllAction, _AbstractToggleAllAct);

  function ToggleAllAction() {
    _classCallCheck(this, ToggleAllAction);

    return _possibleConstructorReturn(this, (ToggleAllAction.__proto__ || Object.getPrototypeOf(ToggleAllAction)).apply(this, arguments));
  }

  return ToggleAllAction;
}(AbstractToggleAllAction);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToggleTodoAction = function (_AbstractToggleTodoAc) {
    _inherits(ToggleTodoAction, _AbstractToggleTodoAc);

    function ToggleTodoAction() {
        _classCallCheck(this, ToggleTodoAction);

        return _possibleConstructorReturn(this, (ToggleTodoAction.__proto__ || Object.getPrototypeOf(ToggleTodoAction)).apply(this, arguments));
    }

    _createClass(ToggleTodoAction, [{
        key: 'initActionData',
        value: function initActionData() {
            this.actionData.id = this.actionParam.id;
        }
    }]);

    return ToggleTodoAction;
}(AbstractToggleTodoAction);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UpdateTodoAction = function (_AbstractUpdateTodoAc) {
    _inherits(UpdateTodoAction, _AbstractUpdateTodoAc);

    function UpdateTodoAction() {
        _classCallCheck(this, UpdateTodoAction);

        return _possibleConstructorReturn(this, (UpdateTodoAction.__proto__ || Object.getPrototypeOf(UpdateTodoAction)).apply(this, arguments));
    }

    _createClass(UpdateTodoAction, [{
        key: 'initActionData',
        value: function initActionData() {
            this.actionData.id = this.actionParam.id;
            this.actionData.description = this.actionParam.description;
        }
    }]);

    return UpdateTodoAction;
}(AbstractUpdateTodoAction);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClearDoneCommand = function (_AbstractClearDoneCom) {
    _inherits(ClearDoneCommand, _AbstractClearDoneCom);

    function ClearDoneCommand() {
        _classCallCheck(this, ClearDoneCommand);

        return _possibleConstructorReturn(this, (ClearDoneCommand.__proto__ || Object.getPrototypeOf(ClearDoneCommand)).apply(this, arguments));
    }

    _createClass(ClearDoneCommand, [{
        key: "execute",
        value: function execute() {
            var _this2 = this;

            return new Promise(function (resolve) {
                _this2.httpDelete("api/todos/clear-done", [], _this2.commandParam).then(function () {
                    _this2.commandData.outcome = _this2.ok;
                    resolve();
                }, function (error) {
                    console.error("error when clearing done", error);
                    _this2.commandData.outcome = _this2.error;
                    resolve();
                });
            });
        }
    }]);

    return ClearDoneCommand;
}(AbstractClearDoneCommand);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreateTodoCommand = function (_AbstractCreateTodoCo) {
    _inherits(CreateTodoCommand, _AbstractCreateTodoCo);

    function CreateTodoCommand() {
        _classCallCheck(this, CreateTodoCommand);

        return _possibleConstructorReturn(this, (CreateTodoCommand.__proto__ || Object.getPrototypeOf(CreateTodoCommand)).apply(this, arguments));
    }

    _createClass(CreateTodoCommand, [{
        key: "execute",
        value: function execute() {
            var _this2 = this;

            return new Promise(function (resolve) {
                if (!_this2.commandParam.description) {
                    _this2.commandData.outcome = _this2.empty;
                    resolve();
                } else {
                    _this2.httpPost("api/todos/create", [], _this2.commandParam).then(function () {
                        _this2.commandData.outcome = _this2.ok;
                        resolve();
                    }, function (error) {
                        console.error("error when creating todo", error);
                        _this2.commandData.outcome = _this2.error;
                        resolve();
                    });
                }
            });
        }
    }]);

    return CreateTodoCommand;
}(AbstractCreateTodoCommand);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeleteTodoCommand = function (_AbstractDeleteTodoCo) {
    _inherits(DeleteTodoCommand, _AbstractDeleteTodoCo);

    function DeleteTodoCommand() {
        _classCallCheck(this, DeleteTodoCommand);

        return _possibleConstructorReturn(this, (DeleteTodoCommand.__proto__ || Object.getPrototypeOf(DeleteTodoCommand)).apply(this, arguments));
    }

    _createClass(DeleteTodoCommand, [{
        key: "execute",
        value: function execute() {
            var _this2 = this;

            return new Promise(function (resolve) {
                var queryParams = [];
                queryParams.push({
                    key: "id",
                    value: _this2.commandParam.id
                });
                _this2.httpDelete("api/todos/delete", queryParams, _this2.commandParam).then(function () {
                    _this2.commandData.outcome = _this2.ok;
                    resolve();
                }, function (error) {
                    console.error("error when deleting todo", error);
                    _this2.commandData.outcome = _this2.error;
                    resolve();
                });
            });
        }
    }]);

    return DeleteTodoCommand;
}(AbstractDeleteTodoCommand);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditTodoCommand = function (_AbstractEditTodoComm) {
    _inherits(EditTodoCommand, _AbstractEditTodoComm);

    function EditTodoCommand() {
        _classCallCheck(this, EditTodoCommand);

        return _possibleConstructorReturn(this, (EditTodoCommand.__proto__ || Object.getPrototypeOf(EditTodoCommand)).apply(this, arguments));
    }

    _createClass(EditTodoCommand, [{
        key: 'execute',
        value: function execute() {
            var _this2 = this;

            return new Promise(function (resolve) {
                _this2.commandData.id = _this2.commandParam.id;
                _this2.commandData.outcome = _this2.ok;
                resolve();
            });
        }
    }]);

    return EditTodoCommand;
}(AbstractEditTodoCommand);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GetTodoListCommand = function (_AbstractGetTodoListC) {
    _inherits(GetTodoListCommand, _AbstractGetTodoListC);

    function GetTodoListCommand() {
        _classCallCheck(this, GetTodoListCommand);

        return _possibleConstructorReturn(this, (GetTodoListCommand.__proto__ || Object.getPrototypeOf(GetTodoListCommand)).apply(this, arguments));
    }

    _createClass(GetTodoListCommand, [{
        key: "execute",
        value: function execute() {
            var _this2 = this;

            return new Promise(function (resolve) {
                _this2.httpGet("api/todos/all").then(function (data) {
                    _this2.commandData.outcome = _this2.ok;
                    _this2.commandData.data = data;
                    resolve();
                }, function (error) {
                    console.error("error when getting todos", error);
                    _this2.commandData.outcome = _this2.error;
                    resolve();
                });
            });
        }
    }]);

    return GetTodoListCommand;
}(AbstractGetTodoListCommand);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InitCommand = function (_AbstractInitCommand) {
    _inherits(InitCommand, _AbstractInitCommand);

    function InitCommand() {
        _classCallCheck(this, InitCommand);

        return _possibleConstructorReturn(this, (InitCommand.__proto__ || Object.getPrototypeOf(InitCommand)).apply(this, arguments));
    }

    _createClass(InitCommand, [{
        key: 'execute',
        value: function execute() {
            var _this2 = this;

            return new Promise(function (resolve) {
                _this2.commandData.outcome = _this2.all;
                _this2.commandData.filter = 'all';
                if (_this2.commandParam.hash !== undefined) {
                    var hashes = _this2.commandParam.hash.split("/");
                    if (hashes.length === 2) {
                        if (hashes[1] === 'active') {
                            _this2.commandData.outcome = _this2.open;
                            _this2.commandData.filter = 'open';
                        } else if (hashes[1] === 'completed') {
                            _this2.commandData.outcome = _this2.done;
                            _this2.commandData.filter = 'done';
                        }
                    }
                    resolve();
                }
            });
        }
    }]);

    return InitCommand;
}(AbstractInitCommand);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToggleAllCommand = function (_AbstractToggleAllCom) {
    _inherits(ToggleAllCommand, _AbstractToggleAllCom);

    function ToggleAllCommand() {
        _classCallCheck(this, ToggleAllCommand);

        return _possibleConstructorReturn(this, (ToggleAllCommand.__proto__ || Object.getPrototypeOf(ToggleAllCommand)).apply(this, arguments));
    }

    _createClass(ToggleAllCommand, [{
        key: "execute",
        value: function execute() {
            var _this2 = this;

            return new Promise(function (resolve) {
                _this2.httpPut("api/todos/toggle-all", [], _this2.commandParam).then(function () {
                    _this2.commandData.outcome = _this2.ok;
                    resolve();
                }, function (error) {
                    console.error("error when toggling all", error);
                    _this2.commandData.outcome = _this2.error;
                    resolve();
                });
            });
        }
    }]);

    return ToggleAllCommand;
}(AbstractToggleAllCommand);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToggleTodoCommand = function (_AbstractToggleTodoCo) {
    _inherits(ToggleTodoCommand, _AbstractToggleTodoCo);

    function ToggleTodoCommand() {
        _classCallCheck(this, ToggleTodoCommand);

        return _possibleConstructorReturn(this, (ToggleTodoCommand.__proto__ || Object.getPrototypeOf(ToggleTodoCommand)).apply(this, arguments));
    }

    _createClass(ToggleTodoCommand, [{
        key: "execute",
        value: function execute() {
            var _this2 = this;

            return new Promise(function (resolve) {
                var queryParams = [];
                queryParams.push({
                    key: "id",
                    value: _this2.commandParam.id
                });
                _this2.httpPut("api/todos/toggle", queryParams, _this2.commandParam).then(function () {
                    _this2.commandData.outcome = _this2.ok;
                    resolve();
                }, function (error) {
                    console.error("error when toggling todo", error);
                    _this2.commandData.outcome = _this2.error;
                    resolve();
                });
            });
        }
    }]);

    return ToggleTodoCommand;
}(AbstractToggleTodoCommand);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UpdateTodoCommand = function (_AbstractUpdateTodoCo) {
    _inherits(UpdateTodoCommand, _AbstractUpdateTodoCo);

    function UpdateTodoCommand() {
        _classCallCheck(this, UpdateTodoCommand);

        return _possibleConstructorReturn(this, (UpdateTodoCommand.__proto__ || Object.getPrototypeOf(UpdateTodoCommand)).apply(this, arguments));
    }

    _createClass(UpdateTodoCommand, [{
        key: "execute",
        value: function execute() {
            var _this2 = this;

            return new Promise(function (resolve) {
                if (!_this2.commandParam.description) {
                    _this2.commandData.outcome = _this2.empty;
                    resolve();
                } else {
                    _this2.httpPut("api/todos/update", [], _this2.commandParam).then(function () {
                        _this2.commandData.outcome = _this2.ok;
                        resolve();
                    }, function (error) {
                        console.error("error when updating todo", error);
                        _this2.commandData.outcome = _this2.error;
                        resolve();
                    });
                }
            });
        }
    }]);

    return UpdateTodoCommand;
}(AbstractUpdateTodoCommand);

/*       S.D.G.       */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function (_React$Component) {
    _inherits(Container, _React$Component);

    function Container(props) {
        _classCallCheck(this, Container);

        var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

        _this.state = {
            todoList: []
        };
        _this.onChangeCheckbox = _this.onChangeCheckbox.bind(_this);
        return _this;
    }

    _createClass(Container, [{
        key: "onChangeCheckbox",
        value: function onChangeCheckbox(event) {
            new ToggleAllAction().apply();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "learn-bar body" },
                    React.createElement(
                        "aside",
                        { className: "learn" },
                        React.createElement(
                            "header",
                            null,
                            React.createElement(
                                "h3",
                                null,
                                "ACE"
                            ),
                            React.createElement(
                                "span",
                                { className: "source-links" },
                                React.createElement(
                                    "h5",
                                    null,
                                    "ACE Example"
                                ),
                                React.createElement(
                                    "a",
                                    { href: "https://github.com/annettedorothea/TodoMVC---Client" },
                                    "Source (Client)"
                                ),
                                React.createElement("br", null),
                                React.createElement(
                                    "a",
                                    { href: "https://github.com/annettedorothea/TodoMVC---Server" },
                                    "Source (Server)"
                                )
                            )
                        ),
                        React.createElement("hr", null),
                        React.createElement(
                            "blockquote",
                            { className: "quote speech-bubble" },
                            React.createElement(
                                "p",
                                null,
                                "ACE is an architecture that allows you to write an executable timeline during the execution of your application. ACE stands for Action - Command - Event:"
                            ),
                            React.createElement(
                                "ul",
                                null,
                                React.createElement(
                                    "li",
                                    null,
                                    "The action captures the user input."
                                ),
                                React.createElement(
                                    "li",
                                    null,
                                    "The command contains your business logic and fires events."
                                ),
                                React.createElement(
                                    "li",
                                    null,
                                    "Your views listen to these events and update themselves accordingly."
                                )
                            ),
                            React.createElement(
                                "p",
                                null,
                                "Both client and server are implemented based on the ACE architecture. The server was written in Java with Dropwizard and the client uses React."
                            ),
                            React.createElement(
                                "footer",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "https://github.com/annettedorothea/com.anfelisa.ace.gen" },
                                    "ACE Code Generator based on Xtext"
                                )
                            )
                        ),
                        React.createElement(
                            "footer",
                            null,
                            React.createElement("hr", null),
                            React.createElement(
                                "em",
                                null,
                                "Client replay does not send requests to the server but uses the captured data in the command. The E2E replay first resets a replay database, makes all changes up to the desired scenario and then executes the scenario end-to-end. The replay is delayed by 1000 ms."
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "section",
                            { className: "todoapp" },
                            React.createElement(
                                "header",
                                { className: "header" },
                                React.createElement(
                                    "h1",
                                    null,
                                    "todos"
                                ),
                                React.createElement(NewTodo, this.state)
                            ),
                            React.createElement(
                                "section",
                                { className: "main" },
                                React.createElement("input", {
                                    className: "toggle-all",
                                    type: "checkbox",
                                    onChange: this.onChangeCheckbox,
                                    checked: this.state.todoList.filter(function (todo) {
                                        return todo.done === false;
                                    }).length === 0
                                })
                            ),
                            React.createElement(TodoList, this.state),
                            React.createElement(Footer, this.state)
                        )
                    ),
                    React.createElement(
                        "footer",
                        { className: "info" },
                        React.createElement(
                            "p",
                            null,
                            "Double-click to edit a todo"
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Created by Annette Pohl"
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Part of ",
                            React.createElement(
                                "a",
                                { href: "http://todomvc.com" },
                                "TodoMVC"
                            )
                        )
                    )
                ),
                React.createElement(Timeline, this.state),
                React.createElement(ReplayTimeline, this.state)
            );
        }
    }]);

    return Container;
}(React.Component);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_React$Component) {
    _inherits(Footer, _React$Component);

    function Footer(props) {
        _classCallCheck(this, Footer);

        var _this = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));

        _this.onClearCompleted = _this.onClearCompleted.bind(_this);
        return _this;
    }

    _createClass(Footer, [{
        key: 'onClearCompleted',
        value: function onClearCompleted(event) {
            new ClearDoneAction().apply();
        }
    }, {
        key: 'render',
        value: function render() {
            var itemCount = this.props.todoList.filter(function (todo) {
                return todo.done !== true;
            }).length;
            var itemsString = itemCount === 1 ? 'item' : 'items';
            return React.createElement(
                'footer',
                { className: 'footer' },
                React.createElement(
                    'span',
                    { className: 'todo-count' },
                    itemCount,
                    ' ',
                    itemsString,
                    ' left'
                ),
                React.createElement(
                    'ul',
                    { className: 'filters' },
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { href: '#/', className: this.props.filter === 'all' ? 'selected' : '' },
                            'All'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { href: '#/active', className: this.props.filter === 'open' ? 'selected' : '' },
                            'Active'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { href: '#/completed', className: this.props.filter === 'done' ? 'selected' : '' },
                            'Completed'
                        )
                    )
                ),
                React.createElement(
                    'button',
                    { className: 'clear-completed', onClick: this.onClearCompleted },
                    'Clear completed'
                )
            );
        }
    }]);

    return Footer;
}(React.Component);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewTodo = function (_React$Component) {
    _inherits(NewTodo, _React$Component);

    function NewTodo(props) {
        _classCallCheck(this, NewTodo);

        var _this = _possibleConstructorReturn(this, (NewTodo.__proto__ || Object.getPrototypeOf(NewTodo)).call(this, props));

        _this.state = {
            value: ''
        };
        _this.onChange = _this.onChange.bind(_this);
        _this.onKeyPress = _this.onKeyPress.bind(_this);
        return _this;
    }

    _createClass(NewTodo, [{
        key: 'onChange',
        value: function onChange(event) {
            this.setState({ value: event.target.value });
        }
    }, {
        key: 'onKeyPress',
        value: function onKeyPress(event) {
            if (event.charCode === 13) {
                new CreateTodoAction({ description: this.state.value }).apply();
                this.setState({ value: '' });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement('input', {
                value: this.state.value,
                placeholder: 'What needs to be done?',
                onKeyPress: this.onKeyPress,
                onChange: this.onChange,
                className: 'new-todo'
            });
        }
    }]);

    return NewTodo;
}(React.Component);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReplayTimeline = function (_React$Component) {
    _inherits(ReplayTimeline, _React$Component);

    function ReplayTimeline(props) {
        _classCallCheck(this, ReplayTimeline);

        return _possibleConstructorReturn(this, (ReplayTimeline.__proto__ || Object.getPrototypeOf(ReplayTimeline)).call(this, props));
    }

    _createClass(ReplayTimeline, [{
        key: 'render',
        value: function render() {
            var items = [];
            if (this.props.expectedTimeline && this.props.actualTimeline) {
                var size = this.props.expectedTimeline.length > this.props.actualTimeline.length ? this.props.expectedTimeline.length : this.props.actualTimeline.length;
                for (var i = 0; i < size; i++) {
                    items.push(React.createElement(ReplayTimelineRow, {
                        key: i,
                        expectedItem: this.props.expectedTimeline[i] ? this.props.expectedTimeline[i] : null,
                        actualItem: this.props.actualTimeline[i] ? this.props.actualTimeline[i] : null
                    }));
                }
            } else if (this.props.expectedTimeline) {
                for (var _i = 0; _i < this.props.expectedTimeline.length; _i++) {
                    items.push(React.createElement(ReplayTimelineRow, {
                        key: _i,
                        expectedItem: this.props.expectedTimeline[_i] ? this.props.expectedTimeline[_i] : null,
                        actualItem: null
                    }));
                }
            }
            return React.createElement(
                'div',
                { className: 'replay' },
                React.createElement(
                    'h1',
                    null,
                    'Replay Timeline'
                ),
                React.createElement(
                    'button',
                    { onClick: ReplayUtils.replay },
                    'Client Replay'
                ),
                React.createElement(
                    'button',
                    { onClick: ReplayUtils.e2e },
                    'E2E Replay'
                ),
                React.createElement(
                    'button',
                    { onClick: ACEController.downloadTimeline },
                    'Download Scenario'
                ),
                React.createElement('input', { type: 'file', accept: 'text/json', onChange: ReplayUtils.uploadTimeline }),
                React.createElement(
                    'table',
                    null,
                    React.createElement(
                        'thead',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                null,
                                'expected'
                            ),
                            React.createElement(
                                'th',
                                null,
                                'actual'
                            )
                        )
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        items
                    )
                )
            );
        }
    }]);

    return ReplayTimeline;
}(React.Component);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReplayTimelineRow = function (_React$Component) {
    _inherits(ReplayTimelineRow, _React$Component);

    function ReplayTimelineRow(props) {
        _classCallCheck(this, ReplayTimelineRow);

        var _this = _possibleConstructorReturn(this, (ReplayTimelineRow.__proto__ || Object.getPrototypeOf(ReplayTimelineRow)).call(this, props));

        _this.state = {
            detailsVisibile: false
        };
        _this.toggleDetailsVisibility = _this.toggleDetailsVisibility.bind(_this);
        return _this;
    }

    _createClass(ReplayTimelineRow, [{
        key: 'toggleDetailsVisibility',
        value: function toggleDetailsVisibility() {
            var detailsVisibile = !this.state.detailsVisibile;
            this.setState({ detailsVisibile: detailsVisibile });
        }
    }, {
        key: 'compareItems',
        value: function compareItems() {
            return JSON.stringify(this.props.expectedItem, ReplayUtils.itemStringifyReplacer) === JSON.stringify(this.props.actualItem, ReplayUtils.itemStringifyReplacer);
        }
    }, {
        key: 'render',
        value: function render() {
            var className = this.compareItems() === false ? 'failure' : 'success';
            return React.createElement(
                'tr',
                { className: className },
                React.createElement(
                    'td',
                    null,
                    React.createElement(TimelineCell, { item: this.props.expectedItem, detailsVisibile: this.state.detailsVisibile,
                        toggleDetailsVisibility: this.toggleDetailsVisibility })
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement(TimelineCell, { item: this.props.actualItem, detailsVisibile: this.state.detailsVisibile,
                        toggleDetailsVisibility: this.toggleDetailsVisibility })
                )
            );
        }
    }]);

    return ReplayTimelineRow;
}(React.Component);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Timeline = function (_React$Component) {
    _inherits(Timeline, _React$Component);

    function Timeline(props) {
        _classCallCheck(this, Timeline);

        return _possibleConstructorReturn(this, (Timeline.__proto__ || Object.getPrototypeOf(Timeline)).call(this, props));
    }

    _createClass(Timeline, [{
        key: "render",
        value: function render() {
            var items = this.props.timeline ? this.props.timeline.map(function (item, i) {
                return React.createElement(TimelineRow, { key: i, item: item });
            }) : [];
            return React.createElement(
                "div",
                { className: "timeline" },
                React.createElement(
                    "h1",
                    null,
                    "Timeline"
                ),
                React.createElement(
                    "table",
                    null,
                    React.createElement(
                        "thead",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                "item"
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        items
                    )
                )
            );
        }
    }]);

    return Timeline;
}(React.Component);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimelineCell = function (_React$Component) {
    _inherits(TimelineCell, _React$Component);

    function TimelineCell(props) {
        _classCallCheck(this, TimelineCell);

        return _possibleConstructorReturn(this, (TimelineCell.__proto__ || Object.getPrototypeOf(TimelineCell)).call(this, props));
    }

    _createClass(TimelineCell, [{
        key: "abstractText",
        value: function abstractText() {
            var item = this.props.item;
            if (item === undefined) {
                return "undefined";
            }
            if (item === null) {
                return "---";
            }
            if (item.action) {
                return "A " + item.action.actionName;
            }
            if (item.command) {
                return "C " + item.command.commandName;
            }
            if (item.event) {
                var triggerActionName = item.event.eventName === 'TriggerAction' ? " " + item.event.eventParam.actionName : "";
                return "E " + item.event.eventName + triggerActionName;
            }
            return "---";
        }
    }, {
        key: "render",
        value: function render() {
            var item = this.props.item;
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "a",
                    { onClick: this.props.toggleDetailsVisibility },
                    this.abstractText()
                ),
                this.props.detailsVisibile && React.createElement(
                    "pre",
                    null,
                    JSON.stringify(item, ReplayUtils.itemStringifyReplacer, 2)
                )
            );
        }
    }]);

    return TimelineCell;
}(React.Component);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimelineRow = function (_React$Component) {
    _inherits(TimelineRow, _React$Component);

    function TimelineRow(props) {
        _classCallCheck(this, TimelineRow);

        var _this = _possibleConstructorReturn(this, (TimelineRow.__proto__ || Object.getPrototypeOf(TimelineRow)).call(this, props));

        _this.state = {
            detailsVisibile: false
        };
        _this.toggleDetailsVisibility = _this.toggleDetailsVisibility.bind(_this);
        return _this;
    }

    _createClass(TimelineRow, [{
        key: "toggleDetailsVisibility",
        value: function toggleDetailsVisibility() {
            var detailsVisibile = !this.state.detailsVisibile;
            this.setState({ detailsVisibile: detailsVisibile });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    null,
                    React.createElement(TimelineCell, { item: this.props.item, detailsVisibile: this.state.detailsVisibile,
                        toggleDetailsVisibility: this.toggleDetailsVisibility })
                )
            );
        }
    }]);

    return TimelineRow;
}(React.Component);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Todo = function (_React$Component) {
    _inherits(Todo, _React$Component);

    function Todo(props) {
        _classCallCheck(this, Todo);

        var _this = _possibleConstructorReturn(this, (Todo.__proto__ || Object.getPrototypeOf(Todo)).call(this, props));

        _this.state = {
            value: ''
        };
        _this.onChange = _this.onChange.bind(_this);
        _this.onKeyPress = _this.onKeyPress.bind(_this);
        _this.onEditClick = _this.onEditClick.bind(_this);
        _this.onChangeCheckbox = _this.onChangeCheckbox.bind(_this);
        _this.onDeleteClick = _this.onDeleteClick.bind(_this);
        _this.moveCaretAtEnd = _this.moveCaretAtEnd.bind(_this);
        return _this;
    }

    _createClass(Todo, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.desriptionField !== undefined && this.desriptionField !== null) {
                this.desriptionField.focus();
            }
        }
    }, {
        key: 'moveCaretAtEnd',
        value: function moveCaretAtEnd(e) {
            e.target.value = '';
            e.target.value = this.props.description;
        }
    }, {
        key: 'onChange',
        value: function onChange(event) {
            this.setState({ value: event.target.value });
        }
    }, {
        key: 'onChangeCheckbox',
        value: function onChangeCheckbox(event) {
            new ToggleTodoAction({
                id: this.props.id
            }).apply();
        }
    }, {
        key: 'onKeyPress',
        value: function onKeyPress(event) {
            if (event.charCode === 13) {
                new UpdateTodoAction({
                    id: this.props.id,
                    description: this.state.value
                }).apply();
            }
        }
    }, {
        key: 'onEditClick',
        value: function onEditClick() {
            new EditTodoAction({ id: this.props.id }).apply();
            this.setState({ value: this.props.description });
        }
    }, {
        key: 'onDeleteClick',
        value: function onDeleteClick() {
            new DeleteTodoAction({ id: this.props.id }).apply();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            if (this.props.editable === true) {
                return React.createElement(
                    'li',
                    { className: 'editing' },
                    React.createElement('input', {
                        className: 'edit',
                        value: this.state.value,
                        onKeyPress: this.onKeyPress,
                        onChange: this.onChange,
                        onFocus: this.moveCaretAtEnd,
                        ref: function ref(input) {
                            _this2.desriptionField = input;
                        }
                    })
                );
            }
            return React.createElement(
                'li',
                { className: this.props.done ? 'completed' : '' },
                React.createElement(
                    'div',
                    { className: 'view' },
                    React.createElement('input', {
                        className: 'toggle',
                        type: 'checkbox',
                        checked: this.props.done,
                        onChange: this.onChangeCheckbox
                    }),
                    React.createElement(
                        'label',
                        { onDoubleClick: this.onEditClick },
                        this.props.description
                    ),
                    React.createElement('button', { className: 'destroy', onClick: this.onDeleteClick })
                )
            );
        }
    }]);

    return Todo;
}(React.Component);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoList = function (_React$Component) {
    _inherits(TodoList, _React$Component);

    function TodoList(props) {
        _classCallCheck(this, TodoList);

        return _possibleConstructorReturn(this, (TodoList.__proto__ || Object.getPrototypeOf(TodoList)).call(this, props));
    }

    _createClass(TodoList, [{
        key: 'filter',
        value: function filter(todo, _filter) {
            if (_filter === 'all') {
                return true;
            } else if (_filter === 'done' && todo.done === true) {
                return true;
            } else if (_filter === 'open' && todo.done === false) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var todoList = this.props.todoList.filter(function (todo) {
                return _this2.filter(todo, _this2.props.filter);
            }).map(function (todo) {
                return React.createElement(Todo, _extends({ key: todo.id }, todo));
            });
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'ul',
                    { className: 'todo-list' },
                    todoList
                )
            );
        }
    }]);

    return TodoList;
}(React.Component);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditTodoEvent = function (_AbstractEditTodoEven) {
    _inherits(EditTodoEvent, _AbstractEditTodoEven);

    function EditTodoEvent() {
        _classCallCheck(this, EditTodoEvent);

        return _possibleConstructorReturn(this, (EditTodoEvent.__proto__ || Object.getPrototypeOf(EditTodoEvent)).apply(this, arguments));
    }

    _createClass(EditTodoEvent, [{
        key: 'prepareDataForView',
        value: function prepareDataForView() {
            this.eventData = JSON.parse(JSON.stringify(this.eventParam));
            if (this.eventData.data === undefined) {
                this.eventData.data = {};
            }
        }
    }]);

    return EditTodoEvent;
}(AbstractEditTodoEvent);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InitFilterEvent = function (_AbstractInitFilterEv) {
    _inherits(InitFilterEvent, _AbstractInitFilterEv);

    function InitFilterEvent() {
        _classCallCheck(this, InitFilterEvent);

        return _possibleConstructorReturn(this, (InitFilterEvent.__proto__ || Object.getPrototypeOf(InitFilterEvent)).apply(this, arguments));
    }

    _createClass(InitFilterEvent, [{
        key: 'prepareDataForView',
        value: function prepareDataForView() {
            this.eventData = JSON.parse(JSON.stringify(this.eventParam));
            if (this.eventData.data === undefined) {
                this.eventData.data = {};
            }
        }
    }]);

    return InitFilterEvent;
}(AbstractInitFilterEvent);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RenderListEvent = function (_AbstractRenderListEv) {
    _inherits(RenderListEvent, _AbstractRenderListEv);

    function RenderListEvent() {
        _classCallCheck(this, RenderListEvent);

        return _possibleConstructorReturn(this, (RenderListEvent.__proto__ || Object.getPrototypeOf(RenderListEvent)).apply(this, arguments));
    }

    _createClass(RenderListEvent, [{
        key: 'prepareDataForView',
        value: function prepareDataForView() {
            this.eventData = JSON.parse(JSON.stringify(this.eventParam));
            if (this.eventData.data === undefined) {
                this.eventData.data = {};
            }
        }
    }]);

    return RenderListEvent;
}(AbstractRenderListEvent);

/*       S.D.G.       */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventListenerRegistrationTodo = function () {
   function EventListenerRegistrationTodo() {
      _classCallCheck(this, EventListenerRegistrationTodo);
   }

   _createClass(EventListenerRegistrationTodo, null, [{
      key: 'init',
      value: function init() {
         ACEController.registerListener('RenderListEvent', TodoView.list);
         ACEController.registerListener('EditTodoEvent', TodoView.edit);
         ACEController.registerListener('InitFilterEvent', FooterView.initFilter);
      }
   }]);

   return EventListenerRegistrationTodo;
}();

EventListenerRegistrationTodo.init();

/*       S.D.G.       */
'use strict';

$.ajaxSetup({ cache: false });

$(window).on('hashchange', function () {
    new InitAction().apply();
});

var container = ReactDOM.render(React.createElement(Container, null), document.getElementById('root'));

AppUtils.start();

/*       S.D.G.       */
