/********************************************************************************
 * generated by de.acegen 1.3.0
 ********************************************************************************/





import * as ACEController from "./ACEController";
import * as AppUtils from "../../src/app/AppUtils";
import * as Utils from "./Utils";
import * as AppState from "./AppState";

export default class Action {

    constructor(actionName) {
        this.actionName = actionName;
    }

    apply(data) {
		ACEController.addItemToTimeLine({
		    appState: AppState.getAppState()
		});
        ACEController.addItemToTimeLine({
            action: {
                actionName: this.actionName,
                data
            }
        });
        if (Utils.settings.mode === "dev") {
            let nonDeterministicValues = JSON.parse(localStorage.getItem("nonDeterministicValues"));
            if (nonDeterministicValues) {
                const nonDeterministicValue = nonDeterministicValues.shift();
                if (nonDeterministicValue) {
                    data.uuid = nonDeterministicValue.uuid;
                    data.clientSystemTime = nonDeterministicValue.clientSystemTime;
                }
                localStorage.setItem('nonDeterministicValues', JSON.stringify(nonDeterministicValues));
            }
            if (!data.uuid) {
                data.uuid = AppUtils.createUUID();
            }
            if (!data.clientSystemTime) {
                data.clientSystemTime = new Date();
            }
        } else {
            data.uuid = AppUtils.createUUID();
            data.clientSystemTime = new Date();
        }
        ACEController.addActionToQueue({
            action: this,
            data
        });
    }
}




/******* S.D.G. *******/




