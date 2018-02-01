import ACEController from "../../gen/ace/ACEController";
import uuid from "uuid";
import InitAction from "../todo/actions/InitAction";
import * as App from "./App";

export default class AppUtils {

    static start() {
        new InitAction().apply();
    }

    static getClientVersion() {
        return "1.0.0";
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
                if (response.status >= 500) {
                    throw new Error(`status code ${response.status} and message ${response.statusText}`);
                } else {
                    return response.json();
                }
            }).then(function (data) {
                if (data.code && data.code >= 400) {
                    throw new Error(`status code ${data.code} and message ${data.message}`);
                } else {
                    resolve(data);
                }
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
                if (response.status >= 500) {
                    throw new Error(`status code ${response.status} and message ${response.statusText}`);
                } else {
                    return response.text();
                }
            }).then(function (data) {
                if (data.code && data.code >= 400) {
                    throw new Error(`status code ${data.code} and message ${data.message}`);
                } else {
                    resolve(data);
                }
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

    static saveBug(description, reporter) {
        const data = {
            description: description,
            reporter: reporter,
            timeline: JSON.stringify(ACEController.timeline),
            clientVersion: AppUtils.getClientVersion(),
            device: browser.name + " " + browser.version
        };
        return AppUtils.httpPost('api/bug/create', null, data);
    }

    static deleteBug(id) {
        let queryParams = [
            {
                key: "id",
                value: id
            }
        ];
        return AppUtils.httpDelete('api/bug/delete', queryParams);
    }

    static resolveBug(id) {
        let queryParams = [
            {
                key: "id",
                value: id
            }
        ];
        return AppUtils.httpDelete('api/bug/resolve', queryParams);
    }

    static loadBugs() {
        return AppUtils.httpGet('api/bug/all');
    }

    static loadBug(id) {
        let queryParams = [
            {
                key: "id",
                value: id
            }
        ];
        return AppUtils.httpGet('api/bug/single', queryParams);
    }

    static getBrowserInfo() {
        let ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return {name: 'IE ', version: (tem[1] || '')};
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR\/(\d+)/)
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

}

/*       S.D.G.       */

