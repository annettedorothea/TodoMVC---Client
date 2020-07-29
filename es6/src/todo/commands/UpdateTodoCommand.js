import AbstractUpdateTodoCommand from "../../../gen/todo/commands/AbstractUpdateTodoCommand";

export default class UpdateTodoCommand extends AbstractUpdateTodoCommand {

    initCommandData() {
        if (!this.commandData.editedTodo.editedDescription) {
            this.commandData.outcome = this.empty;
            return false;
        } else {
            this.commandData.id = this.commandData.editedTodo.id;
            this.commandData.description = this.commandData.editedTodo.editedDescription;
            return true;
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
