import AbstractClearDoneCommand from "../../../gen/todo/commands/AbstractClearDoneCommand";

export default class ClearDoneCommand extends AbstractClearDoneCommand {

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
