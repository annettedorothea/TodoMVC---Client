import AbstractToggleAllCommand from "../../../gen/app/todo/commands/AbstractToggleAllCommand";

export default class ToggleAllCommand extends AbstractToggleAllCommand {
    execute() {
        return new Promise((resolve) => {
            this.httpPut("api/todos/toggle-all", [], this.commandParam).then(() => {
                this.commandData.outcome = this.ok;
                resolve();
            }, (error) => {
                console.error("error when toggling all", error);
                this.commandData.outcome = this.error;
                resolve();
            });
        });
    }
}

/*       S.D.G.       */
