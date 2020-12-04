/********************************************************************************
 * generated by de.acegen 1.0.5
 ********************************************************************************/




import InitAction from "../../src/todo/actions/InitAction";
import CreateCategoryAction from "../../src/todo/actions/CreateCategoryAction";
import GetTodoListAction from "../../src/todo/actions/GetTodoListAction";
import GetTodoListWithoutCategoryCheckAction from "../../src/todo/actions/GetTodoListWithoutCategoryCheckAction";
import NewTodoChangedAction from "../../src/todo/actions/NewTodoChangedAction";
import NewTodoKeyPressedAction from "../../src/todo/actions/NewTodoKeyPressedAction";
import CreateTodoAction from "../../src/todo/actions/CreateTodoAction";
import EditTodoAction from "../../src/todo/actions/EditTodoAction";
import EditedTodoChangedAction from "../../src/todo/actions/EditedTodoChangedAction";
import EditedTodoKeyPressedAction from "../../src/todo/actions/EditedTodoKeyPressedAction";
import UpdateTodoAction from "../../src/todo/actions/UpdateTodoAction";
import ToggleTodoAction from "../../src/todo/actions/ToggleTodoAction";
import ToggleAllAction from "../../src/todo/actions/ToggleAllAction";
import DeleteTodoAction from "../../src/todo/actions/DeleteTodoAction";
import ClearDoneAction from "../../src/todo/actions/ClearDoneAction";
import DisplayErrorAction from "../../src/todo/actions/DisplayErrorAction";

export function init(hash) {
    new InitAction(hash).apply();
}

export function createCategory() {
    new CreateCategoryAction().apply();
}

export function getTodoList() {
    new GetTodoListAction().apply();
}

export function getTodoListWithoutCategoryCheck() {
    new GetTodoListWithoutCategoryCheckAction().apply();
}

export function newTodoChanged(newTodo) {
    new NewTodoChangedAction(newTodo).apply();
}

export function newTodoKeyPressed(charCode) {
    new NewTodoKeyPressedAction(charCode).apply();
}

export function createTodo() {
    new CreateTodoAction().apply();
}

export function editTodo(id) {
    new EditTodoAction(id).apply();
}

export function editedTodoChanged(editedDescription) {
    new EditedTodoChangedAction(editedDescription).apply();
}

export function editedTodoKeyPressed(charCode) {
    new EditedTodoKeyPressedAction(charCode).apply();
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

export function displayError(error) {
    new DisplayErrorAction(error).apply();
}





/******* S.D.G. *******/



