import AppUtils from "../../app/AppUtils";

export default class TodoView {

    static setTodoList(eventData) {
        AppUtils.setAppState({
            todoList: eventData.todoList
        });
    };

}

/*                    S.D.G.                    */
