import AbstractCreateTodoCommand from "../../../gen/todo/commands/AbstractCreateTodoCommand";

export default class CreateTodoCommand extends AbstractCreateTodoCommand {
    execute() {
        return new Promise((resolve) => {
            if (!this.commandParam.description) {
                this.commandData.outcome = this.empty;
                resolve();
            } else {
                this.httpPost("api/todos/create", [], this.commandParam).then(() => {
                    this.commandData.outcome = this.ok;
                    resolve();
                }, (error) => {
                    console.error("error when creating todo", error);
                    this.commandData.outcome = this.error;
                    resolve();
                });
            }
        });
    }
}

/*       S.D.G.       */
