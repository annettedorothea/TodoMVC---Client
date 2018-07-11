import AbstractUpdateTodoCommand from "../../../gen/todo/commands/AbstractUpdateTodoCommand";

export default class UpdateTodoCommand extends AbstractUpdateTodoCommand {
    execute() {
        return new Promise((resolve, reject) => {
            if (!this.commandData.description) {
                this.commandData.outcome = this.empty;
                resolve();
            } else {
                this.httpPut("api/todos/update", [], this.commandData).then(() => {
                    this.commandData.outcome = this.ok;
                    resolve();
                }, (error) => {
                    reject(error);
                });
            }
        });
    }
}

/*       S.D.G.       */
