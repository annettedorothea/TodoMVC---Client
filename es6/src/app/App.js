import AppUtils from './AppUtils';
import {ContainerComponent} from "../../gen/components/ContainerComponent";
import * as AppState from "../../gen/ace/AppState";

import React from "react";
import ReactDOM from "react-dom";
import Utils from "../../gen/ace/Utils";

export * from "../../gen/ace/Timeline";
export { dumpAppState } from "./AppUtils";

AppUtils.createInitialAppState();

ReactDOM.render(
    <ContainerComponent />,
    document.getElementById('root')
);

AppUtils.initEventListenersAndActionFactories();
AppUtils.startApp();

AppUtils.renderNewState = () => {
    if (Utils.settings && Utils.settings.mode === "dev") {
        localStorage.setItem("appState", JSON.stringify(AppState.getAppState()));
    }
    //setState(AppState.getAppState());
}

/*       S.D.G.       */