import InitAction from "../../src/todo/actions/InitAction";
import GetTodoListAction from "../../src/todo/actions/GetTodoListAction";
import CreateTodoAction from "../../src/todo/actions/CreateTodoAction";
import EditTodoAction from "../../src/todo/actions/EditTodoAction";
import UpdateTodoAction from "../../src/todo/actions/UpdateTodoAction";
import ToggleTodoAction from "../../src/todo/actions/ToggleTodoAction";
import ToggleAllAction from "../../src/todo/actions/ToggleAllAction";
import DeleteTodoAction from "../../src/todo/actions/DeleteTodoAction";
import ClearDoneAction from "../../src/todo/actions/ClearDoneAction";

export function init(actionParam) {
    new InitAction(actionParam).apply();
}

export function getTodoList(actionParam) {
    new GetTodoListAction(actionParam).apply();
}

export function createTodo(actionParam) {
    new CreateTodoAction(actionParam).apply();
}

export function editTodo(actionParam) {
    new EditTodoAction(actionParam).apply();
}

export function updateTodo(actionParam) {
    new UpdateTodoAction(actionParam).apply();
}

export function toggleTodo(actionParam) {
    new ToggleTodoAction(actionParam).apply();
}

export function toggleAll(actionParam) {
    new ToggleAllAction(actionParam).apply();
}

export function deleteTodo(actionParam) {
    new DeleteTodoAction(actionParam).apply();
}

export function clearDone(actionParam) {
    new ClearDoneAction(actionParam).apply();
}


/*       S.D.G.       */
