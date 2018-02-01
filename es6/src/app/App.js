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

window.onhashchange = () => {
    new InitAction().apply();
};

export const container = ReactDOM.render(
    <Container />,
    document.getElementById('root')
);

EventListenerRegistrationTodo.init();
ActionFactoryRegistrationTodo.init();
AppUtils.start();

/*       S.D.G.       */