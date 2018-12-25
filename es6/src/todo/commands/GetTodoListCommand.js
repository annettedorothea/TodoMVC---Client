import AbstractGetTodoListCommand from "../../../gen/todo/commands/AbstractGetTodoListCommand";

export default class GetTodoListCommand extends AbstractGetTodoListCommand {

    isCommandDataValid() {
    	return true;
    }

    handleResponse(data) {
        this.commandData.todoList = data.todoList;
    	this.commandData.outcome = this.ok;
    }
}

/*       S.D.G.       */
