import AppUtils from "../../app/AppUtils";

export default class TodoView {

    static setTodoList(eventData) {
        AppUtils.setAppState({
            todoList: eventData.todoList
        });
    };

    static newTodoChanged(eventData) {
        AppUtils.setAppState({
            newTodo: eventData.newTodo
        });
    };

}

/*                    S.D.G.                    */
