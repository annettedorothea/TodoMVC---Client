import React from "react";
import ReactDOM from "react-dom";
import EventListenerRegistrationTodo from "../gen/todo/EventListenerRegistration";
import EventListenerRegistrationInit from "../gen/init/EventListenerRegistration";
import {init} from "../gen/todo/ActionFunctions";
import * as R from 'ramda'
import * as AppState from "./AppState";
import {ContainerContainer} from "../gen/components/ContainerContainer";
import {setHash} from "../gen/init/ActionFunctions";



export let settings;

function loadSettings() {
    return httpGet("settings.json").then((loadedSettings) => {
        settings = loadedSettings;
        if (!settings.clientVersion) {
            settings.clientVersion = "";
        }
        if (!settings.aceScenariosApiKey) {
            settings.aceScenariosApiKey = "";
        }
        if (!settings.aceScenariosBaseUrl) {
            settings.aceScenariosBaseUrl = "";
        }
        if (!settings.rootPath) {
            settings.rootPath = "";
        }
        if (!settings.timelineSize) {
            settings.timelineSize = 0;
        }
        if (!settings.mode) {
            settings.mode = "live";
        }
        if (settings.rootPath.startsWith("/")) {
            settings.rootPath = settings.rootPath.substring(1);
        }
        if (settings.rootPath.endsWith("/")) {
            settings.rootPath = settings.rootPath.substring(0, settings.rootPath.length - 1);
        }
    });
}


export function initEventListeners() {
    EventListenerRegistrationTodo.init();
    EventListenerRegistrationInit.init();
}

export function startApp() {
    window.onhashchange = () => {
        init();
    };
    loadSettings().then(() => {
        init();
    });
}

export function startReplay() {
    window.onhashchange = () => {
    };
}

function createHeaders(authorize) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    if (authorize === true) {
        let authorization = basicAuth();
        if (authorization !== undefined) {
            headers.append("Authorization", authorization);
        }
    }
    return headers;
}

function addUuidToUrl(url, uuid) {
    if (uuid) {
        if (url.indexOf("?") < 0) {
            url += "?uuid=" + uuid;
        } else {
            url += "&uuid=" + uuid;
        }
    }
    return url;
}

function httpRequest(methodType, url, uuid, authorize, data) {
    return new Promise((resolve, reject) => {
        const options = {
            method: methodType,
            headers: createHeaders(authorize),
            mode: 'cors',
            cache: 'no-cache'
        };
        if (data && methodType !== "GET") {
            options.body = JSON.stringify(data);
        }
        url = addUuidToUrl(url, uuid);
        const request = new Request(url, options);

        fetch(request).then(function (response) {
            response.text().then((text) => {
                if (response.status >= 300) {
                    const error = {
                        code: response.status,
                        text: response.statusText,
                        key: text
                    };
                    reject(error);
                } else {
                    let data = {};
                    if (text.length > 0) {
                        data = JSON.parse(text);
                    }
                    resolve(data);
                }
            });
        }).catch(function (error) {
            const status = {
                code: error.name,
                text: error.message
            };
            reject(status);
        });
    });
}

export function httpGet(url, uuid, authorize) {
    return httpRequest("GET", url, uuid, authorize, null);
}

export function httpPost(url, uuid, authorize, data) {
    return httpRequest("POST", url, uuid, authorize, data);
}

export function httpPut(url, uuid, authorize, data) {
    return httpRequest("PUT", url, uuid, authorize, data);
}

export function httpDelete(url, uuid, authorize, data) {
    return httpRequest("DELETE", url, uuid, authorize, data);
}

function basicAuth() {
    return "<your authorization>";
}

export function createUUID() {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export function displayUnexpectedError(error) {
    console.error("unexpected error ", error);
}

export function deepCopy(object) {
    return R.clone(object);
}

export function renderApp() {
    let container = <ContainerContainer {...AppState.appState} />;
    ReactDOM.render(
        container,
        document.getElementById('root')
    );
}


// for Selenium tests

export function addSquishyValueServer(uuid, key, value) {
    return new Promise(() => {
        let url = "";
        if (key === "system-time") {
            url = `/api/test/squishy/system-time?uuid=${uuid}&system-time=${value}`;
        } else {
            url = `/api/test/squishy/value?uuid=${uuid}&key=${key}&value=${value}`
        }
        return new Promise((resolve, reject) => {
            httpPut(url).then(() => {
                resolve();
            }, (error) => {
                reject(error);
            });
        });
    })
}

const squishyClientValues = [];

export function addSquishyValueClient(value) {
    squishyClientValues.push(JSON.parse(value));
}

export function readSquishyValuesClient(data) {
    const squishyValue = squishyClientValues.shift();
    if (squishyValue) {
        data.uuid = squishyValue.uuid;
        data.clientSystemTime = squishyValue.clientSystemTime;
    }
    if (!data.uuid) {
        data.uuid = createUUID();
    }
    if (!data.clientSystemTime) {
        data.clientSystemTime = new Date();
    }
}

export function getValueFromLocalStorage(key) {
    return localStorage.getItem(key);
}

export function getAppState() {
    return AppState.get([])
}


/******* S.D.G. *******/






