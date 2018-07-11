import ACEController from "./ACEController";
import Command from "./Command";

export default class SynchronousCommand extends Command {
    executeCommand() {
        if (ACEController.execution !== ACEController.REPLAY) {
            try {
                this.execute();
                ACEController.addItemToTimeLine({command: this});
                this.publishEvents();
                if (ACEController.execution === ACEController.LIVE) {
                    ACEController.applyNextActions();
                } else {
                    setTimeout(ACEController.applyNextActions, ACEController.pauseInMillis);
                }
            }
            catch (error) {
            	console.error(`execute command ${this.commandName} failed`, error);
                if (ACEController.execution === ACEController.LIVE) {
                    ACEController.applyNextActions();
                } else {
                    setTimeout(ACEController.applyNextActions, ACEController.pauseInMillis);
                }
            }
        } else {
            try {
                const timelineCommand = ACEController.getCommandByUuid(this.commandData.uuid);
                this.commandData = timelineCommand.commandData;
                ACEController.addItemToTimeLine({command: this});
                this.publishEvents();
                setTimeout(ACEController.applyNextActions, ACEController.pauseInMillis);
            } catch (e) {
                setTimeout(ACEController.applyNextActions, ACEController.pauseInMillis);
            }
        }
    }

}

/*       S.D.G.       */


