import AbstractEditTodoCommand from "../../../gen/todo/commands/AbstractEditTodoCommand";

export default class EditTodoCommand extends AbstractEditTodoCommand {
    execute() {
        return new Promise((resolve) => {
            this.commandData.id = this.commandParam.id;
            this.commandData.outcome = this.ok;
			resolve();
        });
    }
}

/*       S.D.G.       */
