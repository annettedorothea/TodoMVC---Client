import AbstractGetTodoListCommand from "../../../gen/todo/commands/AbstractGetTodoListCommand";

export default class GetTodoListCommand extends AbstractGetTodoListCommand {

    handleResponse(resolve, reject) {
    	this.commandData.outcome = this.ok;
    	resolve();
    }
    handleError(resolve, reject) {
    	reject(this.commandData.error);
    }
}

/*       S.D.G.       */
