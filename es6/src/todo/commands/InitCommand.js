import AbstractInitCommand from "../../../gen/todo/commands/AbstractInitCommand";

export default class InitCommand extends AbstractInitCommand {
    execute() {
        this.commandData.outcome = this.ok;
        this.commandData.filter = 'all';
        this.commandData.categoryId = "defaultCategory";
        if (this.commandData.hash !== undefined) {
            let hashes = this.commandData.hash.split("/");
            if (hashes.length >= 2) {
                this.commandData.categoryId = hashes[1];
            }
            if (hashes.length === 3) {
                if (hashes[2] === 'active') {
                    this.commandData.filter = 'open';
                } else if (hashes[2] === 'completed') {
                    this.commandData.filter = 'done';
                }
            }
        }
    }
}

/*       S.D.G.       */
