import AbstractToggleTodoCommand from "../../../gen/todo/commands/AbstractToggleTodoCommand";

export default class ToggleTodoCommand extends AbstractToggleTodoCommand {
    execute() {
        return new Promise((resolve, reject) => {
            let queryParams = [];
            queryParams.push({
                key: "id",
                value: this.commandData.id
            });
            this.httpPut("api/todos/toggle", queryParams, this.commandData).then(() => {
                this.commandData.outcome = this.ok;
                resolve();
            }, (error) => {
                reject(error);
            });
        });
    }
}

/*       S.D.G.       */
