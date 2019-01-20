import AbstractCreateTodoCommand from "../../../gen/todo/commands/AbstractCreateTodoCommand";

export default class CreateTodoCommand extends AbstractCreateTodoCommand {

    initCommandData() {
        if (!this.commandData.description) {
            this.commandData.outcome = this.empty;
            return false;
        } else {
            return true;
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
