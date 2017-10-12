'use strict';

class AbstractUpdateTodoCommand extends Command {
    constructor(commandParam) {
        super(commandParam, "UpdateTodoCommand");
        this.ok = "ok";
        this.error = "error";
        this.empty = "empty";
    }

    publishEvents() {
    	let promises = [];
    	
        switch (this.commandData.outcome) {
        case this.ok:
        	promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
        	break;
        case this.error:
        	promises.push(new TriggerAction(new GetTodoListAction(this.commandData)).publish());
        	break;
        case this.empty:
        	break;
    	default:
    		throw 'unhandled outcome: ' + this.commandData.outcome;
    	}
    	return Promise.all(promises);
    }
}

/*       S.D.G.       */
