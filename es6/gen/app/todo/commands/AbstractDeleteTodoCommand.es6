'use strict';

class AbstractDeleteTodoCommand extends Command {
    constructor(commandParam) {
        super(commandParam, "DeleteTodoCommand");
        this.ok = "ok";
        this.error = "error";
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
    	default:
    		throw 'unhandled outcome: ' + this.commandData.outcome;
    	}
    	return Promise.all(promises);
    }
}

/*       S.D.G.       */
