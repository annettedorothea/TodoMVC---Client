'use strict';

class ClearDoneCommand extends AbstractClearDoneCommand {
    execute() {
        return new Promise((resolve) => {
            this.httpDelete("api/todos/clear-done", [], this.commandParam).then(() => {
                this.commandData.outcome = this.ok;
                resolve();
            }, (error) => {
                console.error("error when clearing done", error);
                this.commandData.outcome = this.error;
                resolve();
            });
        });
    }
}

/*       S.D.G.       */
