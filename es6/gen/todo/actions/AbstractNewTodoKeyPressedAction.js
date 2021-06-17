/********************************************************************************
 * generated by de.acegen 1.3.0
 ********************************************************************************/




import Action from "../../ace/SynchronousAction";
import NewTodoKeyPressedCommand from "../../../src/todo/commands/NewTodoKeyPressedCommand";

export default class AbstractNewTodoKeyPressedAction extends Action {

    constructor( charCode) {
        super({charCode}, 'todo.NewTodoKeyPressedAction');
	}
		
	getCommand() {
		return new NewTodoKeyPressedCommand(this.actionData);
	}


}




/******* S.D.G. *******/



