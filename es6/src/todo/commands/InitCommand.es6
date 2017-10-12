'use strict';

class InitCommand extends AbstractInitCommand {
    execute() {
        return new Promise((resolve) => {
            this.commandData.outcome = this.all;
            this.commandData.filter = 'all';
            if (this.commandParam.hash !== undefined) {
                let hashes = this.commandParam.hash.split("/");
                if (hashes.length === 2) {
                    if (hashes[1] === 'active') {
                        this.commandData.outcome = this.open;
                        this.commandData.filter = 'open';
                    } else if (hashes[1] === 'completed') {
                        this.commandData.outcome = this.done;
                        this.commandData.filter = 'done';
                    }
                }
                resolve();
            }
        });
    }
}

/*       S.D.G.       */
