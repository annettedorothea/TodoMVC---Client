import AbstractUpdateTodoCommand from "../../../gen/app/todo/commands/AbstractUpdateTodoCommand";

export default class UpdateTodoCommand extends AbstractUpdateTodoCommand {
    execute() {
        return new Promise((resolve) => {
            if (!this.commandParam.description) {
                this.commandData.outcome = this.empty;
                resolve();
            } else {
                this.httpPut("api/todos/update", [], this.commandParam).then(() => {
                    this.commandData.outcome = this.ok;
                    resolve();
                }, (error) => {
                    console.error("error when updating todo", error);
                    this.commandData.outcome = this.error;
                    resolve();
                });
            }
        });
    }
}

/*       S.D.G.       */
