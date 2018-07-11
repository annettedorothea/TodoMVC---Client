import ACEController from "./ACEController";
import Action from "./Action";
import AppUtils from "../../src/app/AppUtils";

export default class SynchronousAction extends Action {

    constructor(actionData, actionName) {
    	super(actionData, actionName);
        this.asynchronous = false;
    }

    applyAction() {
        if (ACEController.execution === ACEController.LIVE) {
            this.actionData.uuid = AppUtils.createUUID();
        }
        this.initActionData();
        ACEController.addItemToTimeLine({action: this});
        let command = this.getCommand();
        if (command) {
            command.executeCommand();
        }
    }
}

/*       S.D.G.       */

