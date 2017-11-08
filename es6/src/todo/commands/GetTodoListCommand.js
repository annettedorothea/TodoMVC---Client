import AbstractGetTodoListCommand from "../../../gen/todo/commands/AbstractGetTodoListCommand";

export default class GetTodoListCommand extends AbstractGetTodoListCommand {
    execute() {
        return new Promise((resolve) => {
            this.httpGet("api/todos/all").then((data) => {
                this.commandData.outcome = this.ok;
                this.commandData.data = data;
                resolve();
            }, (error) => {
                console.error("error when getting todos", error);
                this.commandData.outcome = this.error;
                resolve();
            });
        });
    }
}

/*       S.D.G.       */
