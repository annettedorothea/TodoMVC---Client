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
            this.preUpdateUI();
            if (ACEController.execution === ACEController.LIVE) {
                this.actionData.uuid = AppUtils.createUUID();
                this.extendActionData();
            }
            this.initActionData();
            ACEController.addItemToTimeLine({action: this});
            let command = this.getCommand();
            if (command) {
                command.executeCommand().then(
                    () => {
                        this.postUpdateUI();
                        resolve();
                    },
                    (error) => {
                        this.postUpdateUI();
                        reject(error);
                    }
                );
            } else {
                this.postUpdateUI();
                resolve();
            }
        });
    }

}

/*       S.D.G.       */

