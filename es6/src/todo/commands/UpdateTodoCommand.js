import AbstractUpdateTodoCommand from "../../../gen/todo/commands/AbstractUpdateTodoCommand";
import {get_state_State_editedTodo} from "../../../gen/ace/ReadAppState"

export default class UpdateTodoCommand extends AbstractUpdateTodoCommand {

    initCommandData() {
        const editedTodo = get_state_State_editedTodo();
        if (!editedTodo.editedDescription) {
            this.commandData.outcome = this.empty;
            return false;
        } else {
            this.commandData.id = editedTodo.id;
            this.commandData.description = editedTodo.editedDescription;
            return true;
        }
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
