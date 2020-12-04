import AbstractToggleTodoCommand from "../../../gen/todo/commands/AbstractToggleTodoCommand";

export default class ToggleTodoCommand extends AbstractToggleTodoCommand {

    handleResponse(resolve) {
        this.addOkOutcome();
    	resolve();
    }
    handleError(resolve, reject) {
        reject(this.commandData.error);
    }
}

/*       S.D.G.       */
