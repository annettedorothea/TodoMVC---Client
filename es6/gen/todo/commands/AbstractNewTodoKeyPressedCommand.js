/********************************************************************************
 * generated by de.acegen
 ********************************************************************************/




import SynchronousCommand from "../../ace/SynchronousCommand";
import Event from "../../ace/Event";
import CreateTodoAction from "../../../src/todo/actions/CreateTodoAction";
import * as AppUtils from "../../../src/AppUtils";
import * as AppState from "../../../src/AppState";

export default class AbstractNewTodoKeyPressedCommand extends SynchronousCommand {
    constructor() {
        super("todo.NewTodoKeyPressedCommand");
    }

    initCommandData(data) {
        data.outcomes = [];
    }

	addEnterOutcome(data) {
		data.outcomes.push("enter");
	}
	addEscOutcome(data) {
		data.outcomes.push("esc");
	}
	addNotEnterOutcome(data) {
		data.outcomes.push("notEnter");
	}
	
	publishEvents(data) {
		return new Promise((resolve) => {
			const events = [];
			const actionsToBeTriggered = [];
			if (data.outcomes.includes("enter")) {
				events.push(new Event('todo.NewTodoKeyPressedEnterEvent'));
				actionsToBeTriggered.push(
					{
						action: new CreateTodoAction(), 
						data: {
						}
					}
				);
			}
			if (data.outcomes.includes("esc")) {
				events.push(new Event('todo.NewTodoKeyPressedEscEvent'));
			}
			
			this.publish(events, data).then(() => {
		  		AppState.stateUpdated();
				this.trigger(actionsToBeTriggered).then(resolve);
			});
		})
	
	}

}




/******* S.D.G. *******/



