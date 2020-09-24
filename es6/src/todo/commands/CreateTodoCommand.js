import AbstractCreateTodoCommand from "../../../gen/todo/commands/AbstractCreateTodoCommand";

export default class CreateTodoCommand extends AbstractCreateTodoCommand {

    validateCommandData() {
        if (this.commandData.description) {
            return true;
        } else {
            this.commandData.outcome = this.empty;
            return false;
        }
    }

    handleResponse(resolve, reject) {
        this.commandData.outcome = this.ok;
        this.commandData.newTodo = "";
    	resolve();
    }
    handleError(resolve, reject) {
    	reject(this.commandData.error);
    }
}

/*       S.D.G.       */
