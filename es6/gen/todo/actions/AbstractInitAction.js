import Action from "../../ace/SynchronousAction";
import InitCommand from "../../../src/todo/commands/InitCommand";

export default class AbstractInitAction extends Action {

    constructor( hash) {
        super({hash}, 'todo.InitAction');
    }
    
	getCommand() {
		return new InitCommand(this.actionData);
	}


}

/*       S.D.G.       */
