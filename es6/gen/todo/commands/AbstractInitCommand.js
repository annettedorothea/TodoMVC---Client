	/********************************************************************************
	 * generated by de.acegen
	 ********************************************************************************/
	
	
	

	import SynchronousCommand from "../../ace/SynchronousCommand";
	import Event from "../../ace/Event";
	import GetTodoListAction from "../../../src/todo/actions/GetTodoListAction";
	import * as AppUtils from "../../../src/AppUtils";
	import * as AppState from "../../../src/AppState";
	
	export default class AbstractInitCommand extends SynchronousCommand {
	    constructor() {
	        super("todo.InitCommand");
	    }
	
	    initCommandData(data) {
	        data.outcomes = [];
	    }

		addOkOutcome(data) {
			data.outcomes.push("ok");
		}
		
		publishEvents(data) {
			const events = [];
			const actionsToBeTriggered = [];
			if (data.outcomes.includes("ok")) {
				events.push(new Event('todo.InitOkEvent'));
				actionsToBeTriggered.push(
					{
						action: new GetTodoListAction(), 
						data: {
						}
					}
				);
			}
			
			this.publish(events, data);
		  	AppState.stateUpdated();
			this.trigger(actionsToBeTriggered);
	
		}

	}
	
	
	
	/******* S.D.G. *******/
	
	
	
