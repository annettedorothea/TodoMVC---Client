'use strict';

class TodoView {
    static list(eventData) {
        container.setState({
            todoList: eventData.data.todoList
        });
    };

    static edit(eventData) {
        let todoList = Object.assign([], container.state.todoList);
        const todo = todoList.find((todo) => todo.id === eventData.id);
        todo.editable = true;
        container.setState({
            todoList: todoList
        });
    };

}

/*                    S.D.G.                    */
