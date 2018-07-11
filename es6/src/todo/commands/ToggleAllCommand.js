import AbstractToggleAllCommand from "../../../gen/todo/commands/AbstractToggleAllCommand";

export default class ToggleAllCommand extends AbstractToggleAllCommand {
    execute() {
        return new Promise((resolve, reject) => {
            this.httpPut("api/todos/toggle-all", [], this.commandData).then(() => {
                this.commandData.outcome = this.ok;
                resolve();
            }, (error) => {
                reject(error);
            });
        });
    }
}

/*       S.D.G.       */
