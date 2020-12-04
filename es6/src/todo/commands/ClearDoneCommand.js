import AbstractClearDoneCommand from "../../../gen/todo/commands/AbstractClearDoneCommand";

export default class ClearDoneCommand extends AbstractClearDoneCommand {

    handleResponse(resolve) {
        this.addOkOutcome();
    	resolve();
    }
    handleError(resolve, reject) {
    	reject(this.commandData.error);
    }
}

/*       S.D.G.       */
