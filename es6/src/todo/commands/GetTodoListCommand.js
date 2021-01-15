import AbstractGetTodoListCommand from "../../../gen/todo/commands/AbstractGetTodoListCommand";

export default class GetTodoListCommand extends AbstractGetTodoListCommand {

    handleResponse(resolve) {
        if (!this.commandData.todoList) {
            this.addCategoryDoesNotExistOutcome()
        } else {
            this.commandData.itemCount = this.commandData.todoList.filter((todo) => todo.done !== true).length;
            this.addOkOutcome();
        }
    	resolve();
    }
    handleError(resolve, reject) {
    	reject(this.commandData.error);
    }
}

/*       S.D.G.       */
