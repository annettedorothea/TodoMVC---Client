/********************************************************************************
 * generated by de.acegen 0.9.10
 ********************************************************************************/




import Action from "../../ace/SynchronousAction";
import EditedTodoChangedCommand from "../../../src/todo/commands/EditedTodoChangedCommand";

export default class AbstractEditedTodoChangedAction extends Action {

    constructor( editedDescription) {
        super({editedDescription}, 'todo.EditedTodoChangedAction');
	}
		
	getCommand() {
		return new EditedTodoChangedCommand(this.actionData);
	}


}




/******* S.D.G. *******/



