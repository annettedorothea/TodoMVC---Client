/********************************************************************************
 * generated by de.acegen 1.5.4
 ********************************************************************************/




import Action from "../../ace/SynchronousAction";
import EditTodoCommand from "../../../src/todo/commands/EditTodoCommand";

export default class AbstractEditTodoAction extends Action {

    constructor(callback) {
        super('todo.EditTodoAction', callback);
	}
		
	getCommand() {
		return new EditTodoCommand();
	}


}




/******* S.D.G. *******/



