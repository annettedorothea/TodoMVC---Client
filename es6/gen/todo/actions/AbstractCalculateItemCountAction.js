/********************************************************************************
 * generated by de.acegen 1.3.0
 ********************************************************************************/




import Action from "../../ace/SynchronousAction";
import CalculateItemCountCommand from "../../../src/todo/commands/CalculateItemCountCommand";

export default class AbstractCalculateItemCountAction extends Action {

    constructor() {
        super({}, 'todo.CalculateItemCountAction');
	}
		
	getCommand() {
		return new CalculateItemCountCommand(this.actionData);
	}


}




/******* S.D.G. *******/



