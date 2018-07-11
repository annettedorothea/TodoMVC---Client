import AbstractEditTodoCommand from "../../../gen/todo/commands/AbstractEditTodoCommand";

export default class EditTodoCommand extends AbstractEditTodoCommand {
    execute() {
        let todo = this.commandData.todoList.find((todo) => todo.id === this.commandData.id);
        todo.editable = true;
        this.commandData.outcome = this.ok;
    }
}

/*       S.D.G.       */
