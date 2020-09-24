import * as App from "./App";
import * as AppState from "../../gen/ace/AppState";
import {init} from "../../gen/todo/ActionFunctions";
import EventListenerRegistrationTodo from "../../gen/todo/EventListenerRegistration";
import ActionFactoryRegistrationTodo from "../../gen/todo/ActionFactoryRegistration";
import Utils from "../../gen/ace/Utils";

export default class AppUtils {

    static initEventListenersAndActionFactories() {
        EventListenerRegistrationTodo.init();
        ActionFactoryRegistrationTodo.init();
    }

    static start() {
        Utils.loadSettings().then(() => {
            init(window.location.hash.substring(1));
        });
    }


    static createInitialAppState() {
        const initialAppState = {
            filter: "all",
            newTodo: "",
            loading: false,
            todoList: [],
            editedTodo: null,
            error: null
        };
        AppState.setInitialAppState(initialAppState);
    }

    static renderNewState() {
        App.render(AppState.getAppState());
    }

    static httpGet(url, uuid, authorize) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Accept", "application/json");
            if (authorize === true) {
                let authorization = AppUtils.basicAuth();
                if (authorization !== undefined) {
                    headers.append("Authorization", authorization);
                }
            }

            if (uuid) {
                if (url.indexOf("?") < 0) {
                    url += "?uuid=" + uuid;
                } else {
                    url += "&uuid=" + uuid;
                }
            }

            const options = {
                method: 'GET',
                headers: headers,
                mode: 'cors',
                cache: 'no-cache'
            };

            const request = new Request(url, options);

            let status;
            let statusText;
            fetch(request).then(function (response) {
                status = response.status;
                statusText = response.statusText;
                if (status >= 300) {
                    return response.text();
                } else {
                    return response.json();
                }
            }).then(function (data) {
                if (status >= 300) {
                    const error = {
                        code: status,
                        text: statusText,
                        errorKey: data
                    };
                    reject(error);
                } else {
                    resolve(data);
                }
            }).catch(function (error) {
                const status = {
                    code: error.name,
                    text: error.message
                };
                reject(status);
            });
        });
    }

    static httpChange(methodType, url, uuid, authorize, data) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Accept", "application/json");
            if (authorize === true) {
                let authorization = AppUtils.basicAuth();
                if (authorization !== undefined) {
                    headers.append("Authorization", authorization);
                }
            }

            if (uuid) {
                if (url.indexOf("?") < 0) {
                    url += "?uuid=" + uuid;
                } else {
                    url += "&uuid=" + uuid;
                }
            }

            const options = {
                method: methodType,
                headers: headers,
                mode: 'cors',
                cache: 'no-cache',
                body: JSON.stringify(data)
            };

            const request = new Request(url, options);

            let status;
            let statusText;
            fetch(request).then(function (response) {
                status = response.status;
                statusText = response.statusText;
                return response.text();
            }).then(function (data) {
                if (status >= 300) {
                    const error = {
                        code: status,
                        text: statusText,
                        errorKey: data
                    };
                    reject(error);
                } else {
                    if (data && typeof data === "object") {
                        resolve(JSON.parse(data));
                    } else {
                        resolve();
                    }
                }
            }).catch(function (error) {
                const status = {
                    code: error.name,
                    text: error.message
                };
                reject(status);
            });
        });
    }

    static httpPost(url, uuid, authorize, data) {
        return AppUtils.httpChange("POST", url, uuid, authorize, data);
    }

    static httpPut(url, uuid, authorize, data) {
        return AppUtils.httpChange("PUT", url, uuid, authorize, data);
    }

    static httpDelete(url, uuid, authorize, data) {
        return AppUtils.httpChange("DELETE", url, uuid, authorize, data);
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
        let errorMessage;
        if (typeof error === "object") {
            errorMessage = "unexpected error " + JSON.stringify(error);
        } else {
            errorMessage = error;
        }
        if (errorMessage.length > 50) {
            errorMessage = errorMessage.slice(0, 50) + "...";
        }
        App.container.setState({
            error: errorMessage
        });
        AppUtils.timer = setTimeout(function () {
            App.container.setState({
                error: null
            });
        }, 7000);
    }

    static deepCopy(object) {
        return JSON.parse(JSON.stringify(object));
    }

}

/*       S.D.G.       */

