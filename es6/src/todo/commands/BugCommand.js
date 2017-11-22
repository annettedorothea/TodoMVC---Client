import AbstractBugCommand from "../../../gen/todo/commands/AbstractBugCommand";

export default class BugCommand extends AbstractBugCommand {
    execute() {
        return new Promise((resolve) => {
            this.commandData.outcome = this.ok;
			resolve();
        });
    }
}

/*       S.D.G.       */
