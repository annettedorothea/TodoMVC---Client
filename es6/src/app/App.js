import InitAction from "../todo/actions/InitAction";
import AppUtils from './AppUtils';
import EventListenerRegistrationTodo from "../../gen/todo/EventListenerRegistration";
import ActionFactoryRegistrationTodo from "../../gen/todo/ActionFactoryRegistration";
import Container from "../components/Container";
import ReactDOM from "react-dom";

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