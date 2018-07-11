import AbstractEditedTodoChangedCommand from "../../../gen/todo/commands/AbstractEditedTodoChangedCommand";

export default class EditedTodoChangedCommand extends AbstractEditedTodoChangedCommand {
    execute() {
        let todo = this.commandData.todoList.find((todo) => todo.id === this.commandData.id);
        todo.editedTodo = this.commandData.editedTodo;
        this.commandData.outcome = this.ok;
    }
}

/*       S.D.G.       */
