import AbstractToggleTodoCommand from "../../../gen/todo/commands/AbstractToggleTodoCommand";

export default class ToggleTodoCommand extends AbstractToggleTodoCommand {

    isCommandDataValid() {
    	return true;
    }

    handleResponse(data) {
    	this.commandData.outcome = this.ok;
    }
}

/*       S.D.G.       */
