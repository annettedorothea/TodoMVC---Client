/********************************************************************************
 * generated by de.acegen 1.5.6
 ********************************************************************************/




import Action from "../../ace/SynchronousAction";
import NewTodoChangedCommand from "../../../src/todo/commands/NewTodoChangedCommand";

export default class AbstractNewTodoChangedAction extends Action {

    constructor(callback) {
        super('todo.NewTodoChangedAction', callback);
	}
		
	getCommand() {
		return new NewTodoChangedCommand();
	}


}




/******* S.D.G. *******/



