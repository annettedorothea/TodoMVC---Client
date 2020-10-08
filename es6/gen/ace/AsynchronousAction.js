/********************************************************************************
 * generated by de.acegen 0.9.10
 ********************************************************************************/




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
            ACEController.addItemToTimeLine({action: this});
        	this.preCall();
            AppUtils.renderNewState();
            this.actionData.uuid = AppUtils.createUUID();
            this.actionData.clientSystemTime = new Date();
            this.initActionData();
            let command = this.getCommand();
            command.executeCommand().then(() => {
			    this.postCall();
			    AppUtils.renderNewState();
			    resolve();
			}, (error) => {
			    this.postCall();
			    AppUtils.renderNewState();
			    reject(error);
			});
        });
    }
    
    preCall() {
    }
    
    postCall() {
    }
    
}




/******* S.D.G. *******/




