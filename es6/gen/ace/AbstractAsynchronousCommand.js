/********************************************************************************
 * generated by de.acegen 0.9.10
 ********************************************************************************/




import ACEController from "./ACEController";
import AppUtils from "../../src/app/AppUtils";
import Utils from "./Utils";
import Command from "./Command";

export default class AbstractAsynchronousCommand extends Command {
    executeCommand() {
        return new Promise((resolve, reject) => {
			if (ACEController.execution !== ACEController.REPLAY) {
				if (this.validateCommandData()) {
				    this.execute().then(() => {
				        ACEController.addItemToTimeLine({command: this});
				        this.publishEvents();
				        resolve();
				    }, (error) => {
				    	ACEController.addItemToTimeLine({command: this});
				        reject(error);
				    });
				} else {
			        ACEController.addItemToTimeLine({command: this});
			        this.publishEvents();
					resolve();
				}
			} else {
				const timelineCommand = ACEController.getCommandByUuid(this.commandData.uuid);
				if (timelineCommand) {
				    if (timelineCommand.commandData.error) {
				        reject(timelineCommand.commandData.error);
				    } else {
				        this.commandData = timelineCommand.commandData;
				        ACEController.addItemToTimeLine({command: this});
				        this.publishEvents();
				        resolve();
				    }
				} else {
				    resolve();
				}
			}
        });
    }

    validateCommandData() {
    	return true;
    }

    httpGet(url, authorize) {
        return Utils.prepareAction(this.commandData.uuid).then(() => {
            return AppUtils.httpGet(url, this.commandData.uuid, authorize);
        }, (error) => {
            throw error;
        });
    }

    httpPost(url, authorize, data) {
        return Utils.prepareAction(this.commandData.uuid).then(() => {
            return AppUtils.httpPost(url, this.commandData.uuid, authorize, data);
        }, (error) => {
            throw error;
        });
    }

    httpPut(url, authorize, data) {
        return Utils.prepareAction(this.commandData.uuid).then(() => {
            return AppUtils.httpPut(url, this.commandData.uuid, authorize, data);
        }, (error) => {
            throw error;
        });
    }

    httpDelete(url, authorize, data) {
        return Utils.prepareAction(this.commandData.uuid).then(() => {
            return AppUtils.httpDelete(url, this.commandData.uuid, authorize, data);
        }, (error) => {
            throw error;
        });
    }

}




/******* S.D.G. *******/





