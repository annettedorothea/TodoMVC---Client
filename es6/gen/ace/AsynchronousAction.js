import ACEController from "./ACEController";
import Action from "./Action";
import AppUtils from "../../src/app/AppUtils";

export default class AsynchronousAction extends Action {

    constructor(actionData, actionName) {
    	super(actionData, actionName);
        this.asynchronous = true;
    }
	
    applyAction() {
        return new Promise((resolve, reject) => {
            if (this.preCall) {
            	this.preCall();
            }
            AppUtils.renderNewState();
            if (ACEController.execution === ACEController.LIVE) {
                this.actionData.uuid = AppUtils.createUUID();
                this.initActionData();
            }
            ACEController.addItemToTimeLine({action: this});
            let command = this.getCommand();
			command.executeCommand().then(
			    () => {
		            if (this.postCall) {
		            	this.postCall();
		            }
			        AppUtils.renderNewState();
			        resolve();
			    },
			    (error) => {
		            if (this.postCall) {
		            	this.postCall();
		            }
			        AppUtils.renderNewState();
			        reject(error);
			    }
			);
        });
    }

}

/*       S.D.G.       */

