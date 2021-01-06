/********************************************************************************
 * generated by de.acegen 1.1.0
 ********************************************************************************/




import Action from "../../ace/SynchronousAction";
import EditedTodoKeyPressedCommand from "../../../src/todo/commands/EditedTodoKeyPressedCommand";

export default class AbstractEditedTodoKeyPressedAction extends Action {

    constructor( charCode) {
        super({charCode}, 'todo.EditedTodoKeyPressedAction');
	}
		
	getCommand() {
		return new EditedTodoKeyPressedCommand(this.actionData);
	}


}




/******* S.D.G. *******/



