import AbstractClearDoneCommand from "../../../gen/todo/commands/AbstractClearDoneCommand";

export default class ClearDoneCommand extends AbstractClearDoneCommand {

    isCommandDataValid() {
    	return true;
    }

    handleResponse(data) {
    	this.commandData.outcome = this.ok;
    }
}

/*       S.D.G.       */
