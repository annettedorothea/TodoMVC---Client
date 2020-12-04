import AbstractEditTodoCommand from "../../../gen/todo/commands/AbstractEditTodoCommand";

export default class EditTodoCommand extends AbstractEditTodoCommand {
    execute() {
        const todo = this.commandData.todoList.filter(todo => todo.id === this.commandData.id);
        this.commandData.editedTodo = todo[0];
        this.commandData.editedTodo.editedDescription = this.commandData.editedTodo.description;
        this.addOkOutcome();
    }
}

/*       S.D.G.       */
