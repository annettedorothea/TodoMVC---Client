'use strict';

class AppUtils {

    static start() {
        new InitAction().apply();
    }

    static timelineChanged(item) {
        container.setState({
            timeline: ACEController.timeline
        });
    }

    static httpGet(url, queryParams, commandParam) {
        return new Promise((resolve, reject) => {
            const adjustedUrl = AppUtils.url(url);
            $.ajax({
                url: adjustedUrl + AppUtils.queryParamString(adjustedUrl, queryParams),
                type: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqxhr, textStatus, error) {
                    reject(`GET failed with ${jqxhr.status}: ${jqxhr.statusText} - ${jqxhr.responseText}`);
                }
            });
        });
    }

    static httpPost(url, queryParams, data, commandParam) {
        return new Promise((resolve, reject) => {
            const adjustedUrl = AppUtils.url(url);
            $.ajax({
                url: adjustedUrl + AppUtils.queryParamString(adjustedUrl, queryParams),
                type: 'post',
                data: JSON.stringify(data),
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json'
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqxhr, textStatus, error) {
                    reject(`POST failed with ${jqxhr.status}: ${jqxhr.statusText} - ${jqxhr.responseText}`);
                }
            });
        });
    }

    static httpPut(url, queryParams, data, commandParam) {
        return new Promise((resolve, reject) => {
            const adjustedUrl = AppUtils.url(url);
            $.ajax({
                url: adjustedUrl + AppUtils.queryParamString(adjustedUrl, queryParams),
                type: 'put',
                data: JSON.stringify(data),
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json'
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqxhr, textStatus, error) {
                    reject(`PUT failed with ${jqxhr.status}: ${jqxhr.statusText} - ${jqxhr.responseText}`);
                }
            });
        });
    }

    static httpDelete(url, queryParams, data, commandParam) {
        return new Promise((resolve, reject) => {
            const adjustedUrl = AppUtils.url(url);
            $.ajax({
                url: adjustedUrl + AppUtils.queryParamString(adjustedUrl, queryParams),
                type: 'delete',
                data: JSON.stringify(data),
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json'
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (jqxhr, textStatus, error) {
                    reject(`DELETE failed with ${jqxhr.status}: ${jqxhr.statusText} - ${jqxhr.responseText}`);
                }
            });
        });
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

}

/*       S.D.G.       */

