/********************************************************************************
 * generated by de.acegen
 ********************************************************************************/




import Action from "../../ace/SynchronousAction";
import NewTodoChangedCommand from "../../../src/todo/commands/NewTodoChangedCommand";

export default class AbstractNewTodoChangedAction extends Action {

    constructor() {
        super('todo.NewTodoChangedAction');
	}
		
	getCommand() {
		return new NewTodoChangedCommand();
	}


}




/******* S.D.G. *******/



