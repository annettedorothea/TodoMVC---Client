import AppUtils from './AppUtils';
import Container from "../components/Container";
import {init} from "../../gen/todo/ActionFunctions";

import React from "react";
import ReactDOM from "react-dom";

export * from "../../gen/ace/Timeline";

AppUtils.createInitialAppState();

export const container = ReactDOM.render(
    <Container />,
    document.getElementById('root')
);

window.onhashchange = () => {
    init(window.location.hash.substring(1));
};

AppUtils.initEventListenersAndActionFactories();
AppUtils.start();

/*       S.D.G.       */