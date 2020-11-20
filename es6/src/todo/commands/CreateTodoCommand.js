import AbstractCreateTodoCommand from "../../../gen/todo/commands/AbstractCreateTodoCommand";

export default class CreateTodoCommand extends AbstractCreateTodoCommand {

    validateCommandData() {
        console.log("CreateTodoCommand", this.commandData);
        if (this.commandData.description) {
            return true;
        } else {
            this.commandData.outcome = this.empty;
            return false;
        }
    }

    handleResponse(resolve) {
        this.commandData.outcome = this.ok;
        this.commandData.newTodo = "";
    	resolve();
    }
    handleError(resolve, reject) {
    	reject(this.commandData.error);
    }
}

/*       S.D.G.       */
