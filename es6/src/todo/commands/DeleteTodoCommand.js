/********************************************************************************
 * generated by de.acegen 1.3.0
 ********************************************************************************/




import AbstractDeleteTodoCommand from "../../../gen/todo/commands/AbstractDeleteTodoCommand";

export default class DeleteTodoCommand extends AbstractDeleteTodoCommand {

    validateCommandData() {
    	return true;
    }

    handleResponse(data, resolve) {
    	this.addOkOutcome(data);
    	resolve(data);
    }
    handleError(data, resolve, reject) {
    	reject(data.error);
    }
}




/******* S.D.G. *******/



