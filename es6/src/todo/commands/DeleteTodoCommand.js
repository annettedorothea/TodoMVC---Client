import AbstractDeleteTodoCommand from "../../../gen/todo/commands/AbstractDeleteTodoCommand";

export default class DeleteTodoCommand extends AbstractDeleteTodoCommand {

    isCommandDataValid() {
    	return true;
    }

    handleResponse(data) {
    	this.commandData.outcome = this.ok;
    }
}

/*       S.D.G.       */
