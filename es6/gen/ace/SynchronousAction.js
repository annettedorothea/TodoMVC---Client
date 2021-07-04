/********************************************************************************
 * generated by de.acegen 1.3.0
 ********************************************************************************/




import * as ACEController from "./ACEController";
import Action from "./Action";

export default class SynchronousAction extends Action {

    constructor(actionData, actionName) {
    	super(actionData, actionName);
    	this.asynchronous = false;
    }

    applyAction() {
	    ACEController.addItemToTimeLine({action: this});
        this.initActionData();
	    let command = this.getCommand();
	    command.executeCommand();
    }
}




/******* S.D.G. *******/




