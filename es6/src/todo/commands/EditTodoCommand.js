import AbstractEditTodoCommand from "../../../gen/todo/commands/AbstractEditTodoCommand";
import {get_state_State_todoList} from "../../../gen/ace/ReadAppState"

export default class EditTodoCommand extends AbstractEditTodoCommand {
    execute() {
        const todoList = get_state_State_todoList();
        const todo = todoList.filter(todo => todo.id === this.commandData.id);
        this.commandData.editedTodo = todo[0];
        this.commandData.editedTodo.editedDescription = this.commandData.editedTodo.description;
        this.commandData.outcome = this.ok;
    }
}

/*       S.D.G.       */
