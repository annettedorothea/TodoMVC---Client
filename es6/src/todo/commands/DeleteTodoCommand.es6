'use strict';

class DeleteTodoCommand extends AbstractDeleteTodoCommand {
    execute() {
        return new Promise((resolve) => {
            let queryParams = [];
            queryParams.push({
                key: "id",
                value: this.commandParam.id
            });
            this.httpDelete("api/todos/delete", queryParams, this.commandParam).then(() => {
                this.commandData.outcome = this.ok;
                resolve();
            }, (error) => {
                console.error("error when deleting todo", error);
                this.commandData.outcome = this.error;
                resolve();
            });
        });
    }
}

/*       S.D.G.       */
