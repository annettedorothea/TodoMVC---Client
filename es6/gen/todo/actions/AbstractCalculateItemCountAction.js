/********************************************************************************
 * generated by de.acegen 1.5.4
 ********************************************************************************/




import Action from "../../ace/SynchronousAction";
import CalculateItemCountCommand from "../../../src/todo/commands/CalculateItemCountCommand";

export default class AbstractCalculateItemCountAction extends Action {

    constructor(callback) {
        super('todo.CalculateItemCountAction', callback);
	}
		
	getCommand() {
		return new CalculateItemCountCommand();
	}


}




/******* S.D.G. *******/



