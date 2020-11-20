/********************************************************************************
 * generated by de.acegen 1.0.2
 ********************************************************************************/




import * as ScenarioUtils from "../../../acegen/src/ScenarioUtils";
import AppUtils from "../../../../es6/src/app/AppUtils";
import * as TodoActionIds from "../../../acegen/gen/todo/TodoActionIds";

const testId = ScenarioUtils.testId();

context('NewTodoChangedWithReturn', () => {
    beforeEach(() => {
    	ScenarioUtils.getCypressFor(TodoActionIds.init, [`#/category_${testId}`])
    	ScenarioUtils.wait(1, 3)
    	ScenarioUtils.getCypressFor(TodoActionIds.newTodoChanged, [`new Item ${testId}`])
    	ScenarioUtils.wait(1, 0)
    })

    it('should change appState', () => {
    	localStorage.setItem("uuid", `${testId}`)
    	AppUtils.httpPut(`/api/test/non-deterministic/system-time?uuid=${testId}&system-time=${new Date('2020-10-10T14:48:00').toISOString()}`)
    	ScenarioUtils.getCypressFor(TodoActionIds.newTodoChanged, [`ENTER`]).should(() => {
    		ScenarioUtils.wait(1, 0).should(() => {
	            const appState = JSON.parse(localStorage.getItem('appState'))
	            expect(appState.newTodo, "newTodoWasReset").to.eql(``)
    		})
        })
    })
})




/******* S.D.G. *******/




