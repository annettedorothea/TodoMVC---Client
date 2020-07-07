import AbstractToggleAllCommand from "../../../gen/todo/commands/AbstractToggleAllCommand";

export default class ToggleAllCommand extends AbstractToggleAllCommand {

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
