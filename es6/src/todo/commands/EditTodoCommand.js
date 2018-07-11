import AbstractEditTodoCommand from "../../../gen/todo/commands/AbstractEditTodoCommand";

export default class EditTodoCommand extends AbstractEditTodoCommand {
    execute() {
        this.commandData.todoList.forEach((todo) => todo.editable = false);
        let todo = this.commandData.todoList.find((todo) => todo.id === this.commandData.id);
        todo.editable = true;
        todo.editedTodo = todo.description;
        this.commandData.outcome = this.ok;
    }
}

/*       S.D.G.       */
