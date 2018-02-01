import AbstractToggleTodoCommand from "../../../gen/todo/commands/AbstractToggleTodoCommand";

export default class ToggleTodoCommand extends AbstractToggleTodoCommand {
    execute() {
        return new Promise((resolve, reject) => {
            let queryParams = [];
            queryParams.push({
                key: "id",
                value: this.commandParam.id
            });
            this.httpPut("api/todos/toggle", queryParams, this.commandParam).then(() => {
                this.commandData.outcome = this.ok;
                resolve();
            }, (error) => {
                reject(error);
            });
        });
    }
}

/*       S.D.G.       */
