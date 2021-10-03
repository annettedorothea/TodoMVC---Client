/********************************************************************************
 * generated by de.acegen 1.5.5
 ********************************************************************************/





import Action from "./Action";

export default class AsynchronousAction extends Action {

    constructor(actionName, callback) {
        super(actionName, callback);
        this.asynchronous = true;
    }

    applyAction(data) {
        return new Promise((resolve, reject) => {
            this.preCall();
            data = this.initActionData(data);
            let command = this.getCommand();
            command.executeCommand(data).then(() => {
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




