/********************************************************************************
 * generated by de.acegen
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
import CalculateItemCountAction from "../../src/todo/actions/CalculateItemCountAction";
import ToggleTodoAction from "../../src/todo/actions/ToggleTodoAction";
import ToggleAllAction from "../../src/todo/actions/ToggleAllAction";
import DeleteTodoAction from "../../src/todo/actions/DeleteTodoAction";
import ClearDoneAction from "../../src/todo/actions/ClearDoneAction";

export function init(hash) {
    return new InitAction().apply({hash});
}

export function createCategory() {
    return new CreateCategoryAction().apply({});
}

export function getTodoList() {
    return new GetTodoListAction().apply({});
}

export function getTodoListWithoutCategoryCheck() {
    return new GetTodoListWithoutCategoryCheckAction().apply({});
}

export function newTodoChanged(newTodo) {
    return new NewTodoChangedAction().apply({newTodo});
}

export function newTodoKeyPressed(keyCode) {
    return new NewTodoKeyPressedAction().apply({keyCode});
}

export function createTodo() {
    return new CreateTodoAction().apply({});
}

export function editTodo(id) {
    return new EditTodoAction().apply({id});
}

export function editedTodoChanged(editedDescription) {
    return new EditedTodoChangedAction().apply({editedDescription});
}

export function editedTodoKeyPressed(keyCode) {
    return new EditedTodoKeyPressedAction().apply({keyCode});
}

export function updateTodo() {
    return new UpdateTodoAction().apply({});
}

export function calculateItemCount() {
    return new CalculateItemCountAction().apply({});
}

export function toggleTodo(id) {
    return new ToggleTodoAction().apply({id});
}

export function toggleAll() {
    return new ToggleAllAction().apply({});
}

export function deleteTodo(id) {
    return new DeleteTodoAction().apply({id});
}

export function clearDone() {
    return new ClearDoneAction().apply({});
}





/******* S.D.G. *******/



