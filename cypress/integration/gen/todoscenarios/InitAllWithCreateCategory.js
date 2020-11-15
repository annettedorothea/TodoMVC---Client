/********************************************************************************
 * generated by de.acegen 1.0.2
 ********************************************************************************/




import * as ScenarioUtils from "../../src/ScenarioUtils";
import * as TodoActionIds from "../todo/TodoActionIds";

const testId = ScenarioUtils.testId();

context('InitAllWithCreateCategory', () => {
    beforeEach(() => {
    	
    })

    it('should change appState', () => {
    	ScenarioUtils.getCypressFor(TodoActionIds.init, [`#/category_${testId}`]).should(() => {
    		ScenarioUtils.wait(500).should(() => {
	            const appState = JSON.parse(localStorage.getItem('appState'))
	            expect(appState.filter, "filterWasSet").to.eql(`all`)
	            expect(appState.categoryId, "categoryWasSet").to.eql(`category_${testId}`)
	            expect(appState.todoList, "emptyTodoListWasFetched").to.eql([])
    		})
        })
    })
})




/******* S.D.G. *******/




