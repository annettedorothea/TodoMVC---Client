import AbstractCreateTodoCommand from "../../../gen/todo/commands/AbstractCreateTodoCommand";

export default class CreateTodoCommand extends AbstractCreateTodoCommand {
    execute() {
        return new Promise((resolve, reject) => {
            if (!this.commandParam.description) {
                this.commandData.outcome = this.empty;
                resolve();
            } else {
                this.httpPost("api/todos/create", [], this.commandParam).then(() => {
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
