import InitAction from "../todo/actions/InitAction";
import AppUtils from './AppUtils';
import EventListenerRegistrationTodo from "../../gen/todo/EventListenerRegistration";
import ActionFactoryRegistrationTodo from "../../gen/todo/ActionFactoryRegistration";
import Container from "../components/Container";

const React = require('react');
const ReactDOM = require('react-dom');

export * from "../../gen/todo/ActionFunctionExports";
export * from "../../gen/ace/Scenario";
export * from "../../gen/ace/Bug";

export let appState = {
    todoList: [],
    newTodo: ""
};

export const container = ReactDOM.render(
    <Container />,
    document.getElementById('root')
);

export function deepMergeState(newAppState) {
    appState = AppUtils.deepMerge(newAppState, appState);
    container.setState(appState);
}

export function mergeState(newAppState) {
    console.log("newAppState", newAppState);
    console.log("appState", appState);
    appState = AppUtils.merge(newAppState, appState);
    container.setState(appState);
}

window.onhashchange = () => {
    new InitAction({
        hash: window.location.hash.substring(1)
    }).apply();
};

EventListenerRegistrationTodo.init();
ActionFactoryRegistrationTodo.init();
AppUtils.start();

/*       S.D.G.       */