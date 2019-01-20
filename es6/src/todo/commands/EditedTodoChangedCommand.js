import AbstractEditedTodoChangedCommand from "../../../gen/todo/commands/AbstractEditedTodoChangedCommand";

export default class EditedTodoChangedCommand extends AbstractEditedTodoChangedCommand {
    execute() {
        this.commandData.outcome = this.ok;
    }
}

/*       S.D.G.       */
