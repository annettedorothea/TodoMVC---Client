import ACEController from "./ACEController";
import Command from "./Command";

export default class SynchronousCommand extends Command {
    executeCommand() {
		if (ACEController.execution !== ACEController.REPLAY) {
		    this.execute();
		} else {
		    const timelineCommand = ACEController.getCommandByUuid(this.commandData.uuid);
		    this.commandData = timelineCommand.commandData;
		}
		ACEController.addItemToTimeLine({command: this});
		this.publishEvents();
    }

}

/*       S.D.G.       */


