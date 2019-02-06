import ACEController from "../../gen/ace/ACEController";
import * as App from "./App";
import * as WriteAppState from "../../gen/ace/WriteAppState";
import * as ReadAppState from "../../gen/ace/ReadAppState";
import {init} from "../../gen/todo/ActionFunctions";

export default class AppUtils {

    static start() {
        AppUtils.loadSettings().then((settings) => {
            AppUtils.settings = settings;
            init(window.location.hash.substring(1));
        });
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
        return AppUtils.settings ? AppUtils.settings.clientVersion : "";
    }

    static isDevelopment() {
        return AppUtils.settings ? AppUtils.settings.development : false;
    }

    static getAceScenariosApiKey() {
        return AppUtils.settings ? AppUtils.settings.aceScenariosApiKey : "";
    }

    static getAceScenariosBaseUrl() {
        return AppUtils.settings ? AppUtils.settings.aceScenariosBaseUrl : "";
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
        WriteAppState.setInitialState(initialAppState);
    }

    static renderNewState() {
        App.render(ReadAppState.getState());
    }

    static httpGet(url, authorize, queryParams) {
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

            const adjustedUrl = AppUtils.url(url);
            const completeUrl = adjustedUrl + AppUtils.queryParamString(adjustedUrl, queryParams);
            const request = new Request(completeUrl, options);

            fetch(request).then(function (response) {
                if (response.status >= 300) {
                    throw new Error(`status code ${response.status} and message ${response.statusText}`);
                } else {
                    return response.json();
                }
            }).then(function (data) {
                resolve(data);
            }).catch(function (error) {
                reject(`GET failed with ${error.message}`);
            });
        });
    }

    static httpChange(methodType, url, authorize, queryParams, data) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Accept", "application/json");

            const options = {
                method: methodType,
                headers: headers,
                mode: 'cors',
                cache: 'no-cache',
                body: JSON.stringify(data)
            };

            const adjustedUrl = AppUtils.url(url);
            const completeUrl = adjustedUrl + AppUtils.queryParamString(adjustedUrl, queryParams);
            const request = new Request(completeUrl, options);

            fetch(request).then(function (response) {
                if (response.status >= 300) {
                    throw new Error(`status code ${response.status} and message ${response.statusText}`);
                } else {
                    return response.text();
                }
            }).then(function (data) {
                resolve(data);
            }).catch(function (error) {
                reject(`${methodType} failed with ${error.message}`);
            });
        });
    }

    static httpPost(url, authorize, queryParams, data, commandParam) {
        return AppUtils.httpChange("POST", url, authorize, queryParams, data, commandParam);
    }

    static httpPut(url, authorize, queryParams, data, commandParam) {
        return AppUtils.httpChange("PUT", url, authorize, queryParams, data, commandParam);
    }

    static httpDelete(url, authorize, queryParams, data, commandParam) {
        return AppUtils.httpChange("DELETE", url, authorize, queryParams, data, commandParam);
    }

    static queryParamString(url, queryParams) {
        let queryString = "";
        if (queryParams && queryParams.length > 0) {
            for (let i = 0; i < queryParams.length; i++) {
                if (url.indexOf('?') < 0 && i === 0) {
                    queryString += '?'
                } else {
                    queryString += '&'
                }
                queryString += queryParams[i].key + "=" + queryParams[i].value;
            }
        }
        return queryString;
    }

    static url(url) {
        if (ACEController.execution !== ACEController.E2E) {
            return url;
        } else {
            return url.replace('api', 'replay');
        }
    }

    static createUUID() {
        let d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    static displayUnexpectedError(error) {
        clearTimeout(AppUtils.timer);
        App.container.setState({
            error: error
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

    static getMaxTimelineSize() {
        return 2000;
    }

}

/*       S.D.G.       */

