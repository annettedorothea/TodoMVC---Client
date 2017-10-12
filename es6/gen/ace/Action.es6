'use strict';

class Action {
    constructor(actionParam, actionName, isInitAction) {
        this.actionName = actionName;
        if (actionParam === undefined) {
            actionParam = {};
        }
        this.actionParam = JSON.parse(JSON.stringify(actionParam));
        this.actionData = {};
        this.isInitAction = isInitAction === true;
        
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
            if (ACEController.execution === ACEController.LIVE) {
                this.actionData.uuid = ACEController.uuidGenerator.createUUID();
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
                command.executeCommand().then(() => {
                    resolve();
                },
                (error) => {
                    reject(error + " when executing command " + command.commandName);
                });
            } else {
                resolve();
            }
        });
    }

}

/*       S.D.G.       */

