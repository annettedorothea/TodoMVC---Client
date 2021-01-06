import * as AppState from "../../gen/ace/AppState";
import {displayError, init} from "../../gen/todo/ActionFunctions";
import EventListenerRegistrationTodo from "../../gen/todo/EventListenerRegistration";
import EventFactoryRegistrationTodo from "../../gen/todo/EventFactoryRegistration";
import Utils from "../../gen/ace/Utils";

export function dumpAppState() {
    console.log(AppState.getAppState());
}

export default class AppUtils {

    static initEventListenersAndActionFactories() {
        EventListenerRegistrationTodo.init();
        EventFactoryRegistrationTodo.init();
    }

    static startApp() {
        window.onhashchange = () => {
            init(window.location.hash.substring(1));
        };
        Utils.loadSettings().then(() => {
            init(window.location.hash.substring(1));
        });
    }

    static startReplay() {
        window.onhashchange = () => {
        };
    }

    static createInitialAppState() {
        const initialAppState = {
            filter: "all",
            newTodoInput: {
                newTodo: "",
            },
            spinner: {
                loading: false,
            },
            todos: {
                todoList: [],
                editedTodo: null,
            },
            error: {
                errorMessage: null
            }
        };
        AppState.setInitialAppState(initialAppState);
    }

    static createHeaders(authorize) {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        if (authorize === true) {
            let authorization = AppUtils.basicAuth();
            if (authorization !== undefined) {
                headers.append("Authorization", authorization);
            }
        }
        return headers;
    }

    static addUuidToUrl(url, uuid) {
        if (uuid) {
            if (url.indexOf("?") < 0) {
                url += "?uuid=" + uuid;
            } else {
                url += "&uuid=" + uuid;
            }
        }
        return url;
    }

    static httpRequest(methodType, url, uuid, authorize, data) {
        return new Promise((resolve, reject) => {
            const options = {
                method: methodType,
                headers: AppUtils.createHeaders(authorize),
                mode: 'cors',
                cache: 'no-cache'
            };
            if (data && methodType !== "GET") {
                options.body = JSON.stringify(data);
            }
            url = AppUtils.addUuidToUrl(url, uuid);
            const request = new Request(url, options);

            return fetch(request).then((response) => {
                return response.text().then((text) => {
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

    static httpGet(url, uuid, authorize) {
        return AppUtils.httpRequest("GET", url, uuid, authorize, null);
    }

    static httpPost(url, uuid, authorize, data) {
        return AppUtils.httpRequest("POST", url, uuid, authorize, data);
    }

    static httpPut(url, uuid, authorize, data) {
        return AppUtils.httpRequest("PUT", url, uuid, authorize, data);
    }

    static httpDelete(url, uuid, authorize, data) {
        return AppUtils.httpRequest("DELETE", url, uuid, authorize, data);
    }

    static basicAuth() {
        return "<your authorization>";
    }

    static createUUID() {
        let d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    static displayUnexpectedError(error) {
        console.error("unexpected error ", error);
        clearTimeout(AppUtils.timer);
        let errorMessage = "";
        if (typeof error === "object") {
            if (error.code && error.text) {
                errorMessage += error.code + " (" + error.text + ") " + error.key;
            } else {
                errorMessage = "unexpected error " + JSON.stringify(error);
            }
        } else {
            errorMessage = error;
        }
        if (errorMessage.length > 50) {
            errorMessage = errorMessage.slice(0, 50) + "...";
        }
        displayError(errorMessage);
        AppUtils.timer = setTimeout(function () {
            displayError(null);
        }, 7000);
    }

    static deepCopy(object) {
        return JSON.parse(JSON.stringify(object));
    }

}

/*       S.D.G.       */

