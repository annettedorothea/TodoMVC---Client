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
            this.preCall();
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
                        this.postCall();
                        resolve();
                    },
                    (error) => {
                        this.postCall();
                        reject(error);
                    }
                );
            } else {
                this.postCall();
                resolve();
            }
        });
    }

}

/*       S.D.G.       */

