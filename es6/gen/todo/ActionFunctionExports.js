import InitAction from "../../src/todo/actions/InitAction";
import GetTodoListAction from "../../src/todo/actions/GetTodoListAction";
import CreateTodoAction from "../../src/todo/actions/CreateTodoAction";
import EditTodoAction from "../../src/todo/actions/EditTodoAction";
import UpdateTodoAction from "../../src/todo/actions/UpdateTodoAction";
import ToggleTodoAction from "../../src/todo/actions/ToggleTodoAction";
import ToggleAllAction from "../../src/todo/actions/ToggleAllAction";
import DeleteTodoAction from "../../src/todo/actions/DeleteTodoAction";
import ClearDoneAction from "../../src/todo/actions/ClearDoneAction";

export function init(actionData) {
    new InitAction(actionData).apply();
}

export function getTodoList(actionData) {
    new GetTodoListAction(actionData).apply();
}

export function createTodo(actionData) {
    new CreateTodoAction(actionData).apply();
}

export function editTodo(actionData) {
    new EditTodoAction(actionData).apply();
}

export function updateTodo(actionData) {
    new UpdateTodoAction(actionData).apply();
}

export function toggleTodo(actionData) {
    new ToggleTodoAction(actionData).apply();
}

export function toggleAll(actionData) {
    new ToggleAllAction(actionData).apply();
}

export function deleteTodo(actionData) {
    new DeleteTodoAction(actionData).apply();
}

export function clearDone(actionData) {
    new ClearDoneAction(actionData).apply();
}


/*       S.D.G.       */
