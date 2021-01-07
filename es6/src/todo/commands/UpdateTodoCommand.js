import AbstractUpdateTodoCommand from "../../../gen/todo/commands/AbstractUpdateTodoCommand";

export default class UpdateTodoCommand extends AbstractUpdateTodoCommand {

    validateCommandData() {
        if (this.commandData.description) {
            return true;
        } else {
            this.addEmptyOutcome();
            this.commandData.editedTodoId = null;
            this.commandData.editedDescription = "";
            return false;
        }
    }

    handleResponse(resolve) {
        this.addOkOutcome();
        this.commandData.editedTodoId = null;
        this.commandData.editedDescription = "";
    	resolve();
    }

    handleError(resolve, reject) {
    	reject(this.commandData.error);
    }
}

/*       S.D.G.       */
