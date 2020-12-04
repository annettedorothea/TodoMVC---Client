import AbstractEditedTodoChangedCommand from "../../../gen/todo/commands/AbstractEditedTodoChangedCommand";

export default class EditedTodoChangedCommand extends AbstractEditedTodoChangedCommand {
    execute() {
        this.addOkOutcome();
    }
}

/*       S.D.G.       */
