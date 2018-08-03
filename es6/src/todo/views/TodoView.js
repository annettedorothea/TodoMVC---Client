import AppUtils from "../../app/AppUtils";
import * as App from "../../app/App";

export default class TodoView {

    static setTodoList(eventData) {
        App.deepMergeState({
            todoList: eventData.todoList
        });
    };

    static newTodoChanged(eventData) {
        App.deepMergeState({
            newTodo: eventData.newTodo
        });
    };

}

/*                    S.D.G.                    */
