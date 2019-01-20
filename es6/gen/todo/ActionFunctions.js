import InitAction from "../../src/todo/actions/InitAction";
import GetTodoListAction from "../../src/todo/actions/GetTodoListAction";
import NewTodoChangedAction from "../../src/todo/actions/NewTodoChangedAction";
import CreateTodoAction from "../../src/todo/actions/CreateTodoAction";
import EditTodoAction from "../../src/todo/actions/EditTodoAction";
import EditedTodoChangedAction from "../../src/todo/actions/EditedTodoChangedAction";
import UpdateTodoAction from "../../src/todo/actions/UpdateTodoAction";
import ToggleTodoAction from "../../src/todo/actions/ToggleTodoAction";
import ToggleAllAction from "../../src/todo/actions/ToggleAllAction";
import DeleteTodoAction from "../../src/todo/actions/DeleteTodoAction";
import ClearDoneAction from "../../src/todo/actions/ClearDoneAction";

export function init(hash) {
    new InitAction(hash).apply();
}

export function getTodoList() {
    new GetTodoListAction().apply();
}

export function newTodoChanged(newTodo) {
    new NewTodoChangedAction(newTodo).apply();
}

export function createTodo(description) {
    new CreateTodoAction(description).apply();
}

export function editTodo(id) {
    new EditTodoAction(id).apply();
}

export function editedTodoChanged(editedDescription) {
    new EditedTodoChangedAction(editedDescription).apply();
}

export function updateTodo() {
    new UpdateTodoAction().apply();
}

export function toggleTodo(id) {
    new ToggleTodoAction(id).apply();
}

export function toggleAll() {
    new ToggleAllAction().apply();
}

export function deleteTodo(id) {
    new DeleteTodoAction(id).apply();
}

export function clearDone() {
    new ClearDoneAction().apply();
}


/*       S.D.G.       */
