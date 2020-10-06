import AppUtils from './AppUtils';
import Container from "../components/Container";

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

/*       S.D.G.       */