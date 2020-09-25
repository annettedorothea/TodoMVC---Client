/********************************************************************************
 * generated by de.acegen 0.9.10
 ********************************************************************************/




import ACEController from "../ace/ACEController";
import InitOkEvent from "./events/InitOkEvent";
import GetTodoListOkEvent from "./events/GetTodoListOkEvent";
import NewTodoChangedOkEvent from "./events/NewTodoChangedOkEvent";
import CreateTodoOkEvent from "./events/CreateTodoOkEvent";
import EditTodoOkEvent from "./events/EditTodoOkEvent";
import EditedTodoChangedOkEvent from "./events/EditedTodoChangedOkEvent";
import UpdateTodoOkEvent from "./events/UpdateTodoOkEvent";
import UpdateTodoEmptyEvent from "./events/UpdateTodoEmptyEvent";

export default class EventFactoryRegistrationTodo {

	static init() {
		ACEController.registerFactory('todo.InitOkEvent', 
			(eventData) => new InitOkEvent(eventData));
		ACEController.registerFactory('todo.GetTodoListOkEvent', 
			(eventData) => new GetTodoListOkEvent(eventData));
		ACEController.registerFactory('todo.NewTodoChangedOkEvent', 
			(eventData) => new NewTodoChangedOkEvent(eventData));
		ACEController.registerFactory('todo.CreateTodoOkEvent', 
			(eventData) => new CreateTodoOkEvent(eventData));
		ACEController.registerFactory('todo.EditTodoOkEvent', 
			(eventData) => new EditTodoOkEvent(eventData));
		ACEController.registerFactory('todo.EditedTodoChangedOkEvent', 
			(eventData) => new EditedTodoChangedOkEvent(eventData));
		ACEController.registerFactory('todo.UpdateTodoOkEvent', 
			(eventData) => new UpdateTodoOkEvent(eventData));
		ACEController.registerFactory('todo.UpdateTodoEmptyEvent', 
			(eventData) => new UpdateTodoEmptyEvent(eventData));
	}

}




/******* S.D.G. *******/



