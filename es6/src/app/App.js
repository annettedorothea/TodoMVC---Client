import AppUtils from './AppUtils';
import Container from "../components/Container";
import {uiElement} from "../components/ContainerNew";
import * as AppState from "../../gen/ace/AppState";

import React from "react";
import ReactDOM from "react-dom";
import Utils from "../../gen/ace/Utils";

export * from "../../gen/ace/Timeline";
export { dumpAppState } from "./AppUtils";

AppUtils.createInitialAppState();

export const container = ReactDOM.render(
    uiElement(AppState.getAppState()),
    document.getElementById('root')
);

AppUtils.initEventListenersAndActionFactories();
AppUtils.startApp();

AppUtils.renderNewState = () => {
    if (Utils.settings && Utils.settings.mode === "dev") {
        localStorage.setItem("appState", JSON.stringify(AppState.getAppState()));
    }
    //container.setState(AppState.getAppState());
}

/*       S.D.G.       */