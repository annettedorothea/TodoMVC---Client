import AbstractCreateTodoCommand from "../../../gen/todo/commands/AbstractCreateTodoCommand";

export default class CreateTodoCommand extends AbstractCreateTodoCommand {

    validateCommandData() {
        if (this.commandData.description) {
            return true;
        } else {
            this.addEmptyOutcome();
            return false;
        }
    }

    handleResponse(resolve) {
        this.addOkOutcome();
        this.commandData.newTodo = "";
    	resolve();
    }
    handleError(resolve, reject) {
    	reject(this.commandData.error);
    }
}

/*       S.D.G.       */
