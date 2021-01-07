import AbstractEditTodoCommand from "../../../gen/todo/commands/AbstractEditTodoCommand";

export default class EditTodoCommand extends AbstractEditTodoCommand {
    execute() {
        const todo = this.commandData.todoList.filter(todo => todo.id === this.commandData.id);
        this.commandData.editedTodoId = todo[0].id;
        this.commandData.editedDescription = todo[0].description;
        this.addOkOutcome();
    }
}

/*       S.D.G.       */
