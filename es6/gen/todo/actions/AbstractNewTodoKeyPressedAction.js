/********************************************************************************
 * generated by de.acegen 1.5.6
 ********************************************************************************/




import Action from "../../ace/SynchronousAction";
import NewTodoKeyPressedCommand from "../../../src/todo/commands/NewTodoKeyPressedCommand";

export default class AbstractNewTodoKeyPressedAction extends Action {

    constructor(callback) {
        super('todo.NewTodoKeyPressedAction', callback);
	}
		
	getCommand() {
		return new NewTodoKeyPressedCommand();
	}


}




/******* S.D.G. *******/



