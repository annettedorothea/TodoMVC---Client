/********************************************************************************
 * generated by de.acegen 1.0.5
 ********************************************************************************/




import * as ScenarioUtils from "../../../acegen/src/ScenarioUtils";
import AppUtils from "../../../../es6/src/app/AppUtils";
import * as TodoActionIds from "../../../acegen/gen/todo/TodoActionIds";

const testId = ScenarioUtils.testId();

context('InitDoneFilterWithCreateCategory', () => {
    beforeEach(() => {
    	let nonDeterministicValues;
    	let nonDeterministicValue;
    })

    it('filterWasSet categoryWasSet emptyTodoListWasFetched ', () => {
    	
    	ScenarioUtils.getCypressFor(TodoActionIds.init, [`#/category_${testId}/done`]).should(() => {
    		ScenarioUtils.wait(1, 3).should(() => {
	            const appState = JSON.parse(localStorage.getItem('appState'))
	            expect(appState.filter, "filterWasSet").to.eql(`done`)
	            expect(appState.categoryId, "categoryWasSet").to.eql(`category_${testId}`)
	            expect(appState.todoList, "emptyTodoListWasFetched").to.eql([
	            ]
	            )
    		})
        })
    })
})




/******* S.D.G. *******/




