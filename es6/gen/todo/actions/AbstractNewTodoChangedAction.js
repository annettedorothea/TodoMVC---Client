import Action from "../../ace/SynchronousAction";
import NewTodoChangedCommand from "../../../src/todo/commands/NewTodoChangedCommand";

export default class AbstractNewTodoChangedAction extends Action {

    constructor( newTodo) {
        super({newTodo}, 'todo.NewTodoChangedAction');
    }
    
	getCommand() {
		return new NewTodoChangedCommand(this.actionData);
	}


}

/*       S.D.G.       */
