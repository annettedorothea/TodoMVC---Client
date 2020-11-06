import AppUtils from './AppUtils';
import Container from "../components/Container";
import * as AppState from "../../gen/ace/AppState";

import React from "react";
import ReactDOM from "react-dom";

export * from "../../gen/ace/Timeline";
export { dumpAppState } from "./AppUtils";

AppUtils.createInitialAppState();

export const container = ReactDOM.render(
    <Container />,
    document.getElementById('root')
);

AppUtils.initEventListenersAndActionFactories();
AppUtils.startApp();

AppUtils.renderNewState = () => {
    container.setState(AppState.getAppState());
}

/*       S.D.G.       */