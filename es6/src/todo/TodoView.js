import * as App from "../../app/App";

export default class TodoView {
    static list(eventData) {
        App.container.setState({
            todoList: eventData.data.todoList
        });
    };

    static edit(eventData) {
        let todoList = Object.assign([], App.container.state.todoList);
        const todo = todoList.find((todo) => todo.id === eventData.id);
        todo.editable = true;
        App.container.setState({
            todoList: todoList
        });
    };

}

/*                    S.D.G.                    */
