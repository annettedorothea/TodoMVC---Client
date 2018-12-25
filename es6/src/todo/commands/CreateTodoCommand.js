import AbstractCreateTodoCommand from "../../../gen/todo/commands/AbstractCreateTodoCommand";

export default class CreateTodoCommand extends AbstractCreateTodoCommand {

    isCommandDataValid() {
        if (!this.commandData.description) {
            this.commandData.outcome = this.empty;
            return false;
        } else {
            return true;
        }
    }

    handleResponse(data) {
        this.commandData.newTodo = "";
        this.commandData.outcome = this.ok;
    }
}

/*       S.D.G.       */
