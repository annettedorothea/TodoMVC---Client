import AbstractInitCommand from "../../../gen/todo/commands/AbstractInitCommand";

export default class InitCommand extends AbstractInitCommand {
    execute() {
        this.commandData.outcome = this.ok;
        this.commandData.filter = 'all';
        if (this.commandData.hash !== undefined) {
            let hashes = this.commandData.hash.split("/");
            if (hashes.length === 2) {
                if (hashes[1] === 'active') {
                    this.commandData.filter = 'open';
                } else if (hashes[1] === 'completed') {
                    this.commandData.filter = 'done';
                }
            }
        }
    }
}

/*       S.D.G.       */
