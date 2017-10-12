'use strict';

class EventListenerRegistrationTodo {

	static init() {
    	ACEController.registerListener('RenderListEvent', TodoView.list);
    	ACEController.registerListener('EditTodoEvent', TodoView.edit);
    	ACEController.registerListener('InitFilterEvent', FooterView.initFilter);
	}

}

EventListenerRegistrationTodo.init();

/*       S.D.G.       */
