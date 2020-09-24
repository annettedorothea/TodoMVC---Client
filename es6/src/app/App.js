import AppUtils from './AppUtils';
import Container from "../components/Container";
import {init} from "../../gen/todo/ActionFunctions";

const React = require('react');
const ReactDOM = require('react-dom');

export * from "../../gen/ace/Bug";

AppUtils.createInitialAppState();

export const container = ReactDOM.render(
    <Container />,
    document.getElementById('root')
);

export function render(newAppState) {
    container.setState(newAppState);
}

window.onhashchange = () => {
    init(window.location.hash.substring(1));
};

AppUtils.initEventListenersAndActionFactories();
AppUtils.start();

/*       S.D.G.       */