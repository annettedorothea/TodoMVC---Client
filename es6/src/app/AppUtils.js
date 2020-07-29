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
        Utils.loadSettings().then((settings) => {
            Utils.settings = settings;
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

    static httpGet(url, authorize) {
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

            const request = new Request(url, options);

            let status;
            let statusText;
            fetch(request).then(function (response) {
                status = response.status;
                statusText = response.statusText;
                if (status < 300) {
                    return response.json();
                }
            }).then(function (data) {
                if (status >= 300) {
                    reject(statusText);
                } else {
                    resolve(data);
                }
            }).catch(function (error) {
                reject(error + " in GET of " + url);
            });
        });
    }

    static httpChange(methodType, url, authorize, data) {
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

            const request = new Request(url, options);

            let status;
            let statusText;
            fetch(request).then(function (response) {
                status = response.status;
                statusText = response.statusText;
            }).then(function () {
                if (status >= 300) {
                    reject(statusText);
                } else {
                    resolve();
                }
            }).catch(function (error) {
                reject(error + " in " + methodType + " of " + url);
            });
        });
    }

    static httpPost(url, authorize, data) {
        return AppUtils.httpChange("POST", url, authorize, data);
    }

    static httpPut(url, authorize, data) {
        return AppUtils.httpChange("PUT", url, authorize, data);
    }

    static httpDelete(url, authorize, data) {
        return AppUtils.httpChange("DELETE", url, authorize, data);
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

}

/*       S.D.G.       */

