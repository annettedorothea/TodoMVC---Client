'use strict';

class AbstractGetTodoListCommand extends Command {
    constructor(commandParam) {
        super(commandParam, "GetTodoListCommand");
        this.ok = "ok";
        this.error = "error";
    }

    publishEvents() {
    	let promises = [];
    	
        switch (this.commandData.outcome) {
        case this.ok:
        	promises.push(new RenderListEvent(this.commandData).publish());
        	break;
        case this.error:
        	break;
    	default:
    		throw 'unhandled outcome: ' + this.commandData.outcome;
    	}
    	return Promise.all(promises);
    }
}

/*       S.D.G.       */
