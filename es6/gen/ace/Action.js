/********************************************************************************
 * generated by de.acegen 1.2.1
 ********************************************************************************/




import ACEController from "./ACEController";
import AppUtils from "../../src/app/AppUtils";
import Utils from "./Utils";

export default class Action {
    constructor(actionData, actionName) {
        this.actionName = actionName;
        if (actionData === undefined) {
            actionData = {};
        }
        this.actionData = AppUtils.deepCopy(actionData);
        if (Utils.settings.mode === "dev") {
        	let nonDeterministicValues = JSON.parse(localStorage.getItem("nonDeterministicValues"));
        	if (nonDeterministicValues) {
        		const nonDeterministicValue = nonDeterministicValues.shift();
        		if (nonDeterministicValue) {
	        		this.actionData.uuid = nonDeterministicValue.uuid;
	        		this.actionData.clientSystemTime = nonDeterministicValue.clientSystemTime;
	        	}
        		localStorage.setItem('nonDeterministicValues', JSON.stringify(nonDeterministicValues));
        	}
        	if (this.actionData.uuid === null) {
        		this.actionData.uuid = AppUtils.createUUID();
        	}
        	if (this.actionData.clientSystemTime === null) {
				this.actionData.clientSystemTime = new Date();
			}
		} else {
			this.actionData.uuid = AppUtils.createUUID();
			this.actionData.clientSystemTime = new Date();
		}
    }

    initActionData() {
    }

    getCommand() {
        throw "no command defined for " + this.actionName;
    }

    apply() {
        ACEController.addActionToQueue(this);
    }
}




/******* S.D.G. *******/




