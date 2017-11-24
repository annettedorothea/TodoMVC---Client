import ACEController from "../../gen/ace/ACEController";
import uuid from "uuid";
import InitAction from "../todo/actions/InitAction";
import * as App from "./App";

export default class AppUtils {

    static start() {
        new InitAction().apply();
    }

    static timelineChanged(item) {
        App.container.setState({
            timeline: ACEController.timeline
        });
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
                return response.json();
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
                return response.text();
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
            data: JSON.stringify(ACEController.timeline)
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


}

/*       S.D.G.       */

