import ACEController from "./ACEController";
import AppUtils from "../../src/app/AppUtils";

export default class Action {
    constructor(actionParam, actionName, isInitAction) {
        this.actionName = actionName;
        if (actionParam === undefined) {
            actionParam = {};
        }
        this.actionParam = JSON.parse(JSON.stringify(actionParam));
        this.actionData = {};
        this.isInitAction = isInitAction === true;
        this.postUpdateUI = this.postUpdateUI.bind(this);
    }

    captureActionParam() {
    }

    releaseActionParam() {
    }

    initActionData() {
    }

    getCommand() {
        throw "no command defined for " + this.actionName;
    }

    apply() {
        ACEController.addActionToQueue(this);
    }

    applyAction() {
        return new Promise((resolve, reject) => {
            this.preUpdateUI();
            if (ACEController.execution === ACEController.LIVE) {
                this.actionData.uuid = AppUtils.createUUID();
            }
            if (ACEController.execution === ACEController.LIVE) {
                this.captureActionParam();
            } else {
                this.releaseActionParam();
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
				        reject(error + "\n" + command.commandName);
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

