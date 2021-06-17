/********************************************************************************
 * generated by de.acegen 1.3.0
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
            this.initActionData();
            let command = this.getCommand();
            command.executeCommand().then(() => {
			    this.postCall();
			    resolve();
			}, (error) => {
			    this.postCall();
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




