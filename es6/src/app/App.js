import AppUtils from './AppUtils';
import EventListenerRegistrationTodo from "../../gen/todo/EventListenerRegistration";
import ActionFactoryRegistrationTodo from "../../gen/todo/ActionFactoryRegistration";
import Container from "../components/Container";
import {init} from "../../gen/todo/ActionFunctions";

const React = require('react');
const ReactDOM = require('react-dom');

export * from "../../gen/ace/Scenario";
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

EventListenerRegistrationTodo.init();
ActionFactoryRegistrationTodo.init();
AppUtils.start();

/*       S.D.G.       */