/********************************************************************************
 * generated by de.acegen 1.1.0
 ********************************************************************************/




import Action from "../../ace/SynchronousAction";
import DisplayErrorCommand from "../../../src/todo/commands/DisplayErrorCommand";

export default class AbstractDisplayErrorAction extends Action {

    constructor( errorMessage) {
        super({errorMessage}, 'todo.DisplayErrorAction');
	}
		
	getCommand() {
		return new DisplayErrorCommand(this.actionData);
	}


}




/******* S.D.G. *******/



