/********************************************************************************
 * generated by de.acegen 1.3.0
 ********************************************************************************/




import Action from "../../ace/SynchronousAction";
import EditTodoCommand from "../../../src/todo/commands/EditTodoCommand";

export default class AbstractEditTodoAction extends Action {

    constructor( id) {
        super({id}, 'todo.EditTodoAction');
	}
		
	getCommand() {
		return new EditTodoCommand(this.actionData);
	}


}




/******* S.D.G. *******/



