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

