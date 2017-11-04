import InitAction from "../src/todo/actions/InitAction";
import AppUtils from './AppUtils';
import EventListenerRegistrationTodo from "../gen/elr/todo/EventListenerRegistration";
import Container from "../src/todo/components/Container";
import ReactDOM from "react-dom";

window.onhashchange = () => {
    new InitAction().apply();
};

export const container = ReactDOM.render(
    <Container />,
    document.getElementById('root')
);

EventListenerRegistrationTodo.init();
AppUtils.start();

/*       S.D.G.       */