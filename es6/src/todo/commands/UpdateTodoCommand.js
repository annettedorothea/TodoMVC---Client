import AbstractUpdateTodoCommand from "../../../gen/todo/commands/AbstractUpdateTodoCommand";

export default class UpdateTodoCommand extends AbstractUpdateTodoCommand {

    isCommandDataValid() {
        if (!this.commandData.description) {
            this.commandData.outcome = this.empty;
            return false;
        } else {
            return true;
        }
    }

    handleResponse(data) {
        this.commandData.outcome = this.ok;
    }
}

/*       S.D.G.       */
