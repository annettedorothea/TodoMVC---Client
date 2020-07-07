import AbstractDeleteTodoCommand from "../../../gen/todo/commands/AbstractDeleteTodoCommand";

export default class DeleteTodoCommand extends AbstractDeleteTodoCommand {

    initCommandData() {
    	return true;
    }

    handleResponse(resolve, reject) {
    	this.commandData.outcome = this.ok;
    	resolve();
    }
    handleError(resolve, reject) {
    	reject(this.commandData.error);
    }
}

/*       S.D.G.       */
