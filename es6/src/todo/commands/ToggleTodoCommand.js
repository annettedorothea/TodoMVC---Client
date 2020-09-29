import AbstractToggleTodoCommand from "../../../gen/todo/commands/AbstractToggleTodoCommand";

export default class ToggleTodoCommand extends AbstractToggleTodoCommand {

    handleResponse(resolve) {
    	this.commandData.outcome = this.ok;
    	resolve();
    }
    handleError(resolve, reject) {
        reject(this.commandData.error);
    }
}

/*       S.D.G.       */
