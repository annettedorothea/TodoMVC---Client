import AbstractUpdateTodoCommand from "../../../gen/todo/commands/AbstractUpdateTodoCommand";

export default class UpdateTodoCommand extends AbstractUpdateTodoCommand {

    validateCommandData() {
        if (this.commandData.description) {
            return true;
        } else {
            this.commandData.outcome = this.empty;
            this.commandData.editedTodo = null;
            return false;
        }
    }

    handleResponse(resolve) {
        this.commandData.outcome = this.ok;
        this.commandData.editedTodo = {};
    	resolve();
    }
    handleError(resolve, reject) {
    	reject(this.commandData.error);
    }
}

/*       S.D.G.       */
