import ACEController from "../../gen/ace/ACEController";
import uuid from "uuid";
import InitAction from "../todo/actions/InitAction";
import * as App from "./App";

export default class AppUtils {

    static start() {
        new InitAction({
            hash: window.location.hash.substring(1)
        }).apply();
    }

    static getClientVersion() {
        return "3.0.0";
    }

    static getApiKey() {
        return "695487f7-f97d-460d-b2b4-a42f050254e9";
    }

    static getAceScenariosBaseUrl() {
        //return "http://127.0.0.1:8070/";
        return "http://ace.anfelisa.com/";
    }

    static httpGet(url, queryParams, commandParam) {
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

    static httpChange(methodType, url, queryParams, data, commandParam) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Accept", "text/plain");

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

    static httpPost(url, queryParams, data, commandParam) {
        return AppUtils.httpChange("POST", url, queryParams, data, commandParam);
    }

    static httpPut(url, queryParams, data, commandParam) {
        return AppUtils.httpChange("PUT", url, queryParams, data, commandParam);
    }

    static httpDelete(url, queryParams, data, commandParam) {
        return AppUtils.httpChange("DELETE", url, queryParams, data, commandParam);
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
        return uuid.v4();
    }

    static displayUnexpectedError(error) {
        clearTimeout(AppUtils.timer);
        App.container.setState({
            error: error
        });
        AppUtils.timer = setTimeout(function () {
            App.container.setState({
                error: undefined
            });
        }, 7000);

    }

    static deepCopy(object) {
        return JSON.parse(JSON.stringify(object));
    }

    static getMaxTimelineSize() {
        return 2000;
    }

    static getAppState() {
        const appState = AppUtils.deepCopy(App.appState);
        delete appState.texts;
        return appState;
    }

    static deepMerge(newState, appState) {
        for (let property in newState) {
            if (newState.hasOwnProperty(property)) {
                if (appState[property] === undefined) {
                    appState[property] = newState[property];
                } else if (newState[property] === undefined) {
                    appState[property] = undefined;
                } else if (Array.isArray(newState[property])) {
                    appState[property] = newState[property];
                } else if (typeof newState[property] === 'object') {
                    AppUtils.deepMerge(newState[property], appState[property]);
                } else {
                    appState[property] = newState[property];
                }
            }
        }
        return appState;
    }

    static merge(newState, appState) {
        for (let property in newState) {
            if (newState.hasOwnProperty(property)) {
                appState[property] = newState[property];
            }
        }
        return appState;
    }

}

/*       S.D.G.       */

