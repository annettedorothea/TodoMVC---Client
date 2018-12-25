import AbstractToggleAllCommand from "../../../gen/todo/commands/AbstractToggleAllCommand";

export default class ToggleAllCommand extends AbstractToggleAllCommand {

    isCommandDataValid() {
    	return true;
    }

    handleResponse(data) {
    	this.commandData.outcome = this.ok;
    }
}

/*       S.D.G.       */
