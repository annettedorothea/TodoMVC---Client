import AbstractGetTodoListCommand from "../../../gen/todo/commands/AbstractGetTodoListCommand";

export default class GetTodoListCommand extends AbstractGetTodoListCommand {
    execute() {
        return new Promise((resolve, reject) => {
            this.httpGet("api/todos/all").then((data) => {
                this.commandData.outcome = this.ok;
                this.commandData.data = data;
                resolve();
            }, (error) => {
                reject(error);
            });
        });
    }
}

/*       S.D.G.       */
