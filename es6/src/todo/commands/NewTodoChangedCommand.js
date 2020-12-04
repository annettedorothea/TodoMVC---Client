import AbstractNewTodoChangedCommand from "../../../gen/todo/commands/AbstractNewTodoChangedCommand";

export default class NewTodoChangedCommand extends AbstractNewTodoChangedCommand {
    execute() {
        this.addOkOutcome();
    }
}

/*       S.D.G.       */
