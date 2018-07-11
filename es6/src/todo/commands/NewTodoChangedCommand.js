import AbstractNewTodoChangedCommand from "../../../gen/todo/commands/AbstractNewTodoChangedCommand";

export default class NewTodoChangedCommand extends AbstractNewTodoChangedCommand {
    execute() {
        this.commandData.outcome = this.ok;
    }
}

/*       S.D.G.       */
