import AbstractDeleteTodoCommand from "../../../gen/todo/commands/AbstractDeleteTodoCommand";

export default class DeleteTodoCommand extends AbstractDeleteTodoCommand {
    execute() {
        return new Promise((resolve, reject) => {
            let queryParams = [];
            queryParams.push({
                key: "id",
                value: this.commandData.id
            });
            this.httpDelete("api/todos/delete", queryParams, this.commandData).then(() => {
                this.commandData.outcome = this.ok;
                resolve();
            }, (error) => {
                reject(error);
            });
        });
    }
}

/*       S.D.G.       */
