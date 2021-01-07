/********************************************************************************
 * generated by de.acegen 1.1.0
 ********************************************************************************/




import * as ScenarioUtils from "../../../acegen/src/ScenarioUtils";
import AppUtils from "../../../../es6/src/app/AppUtils";
import * as TodoActionIds from "../../../acegen/gen/todo/TodoActionIds";

const testId = ScenarioUtils.testId();

context('EditTodoChanged', () => {
    beforeEach(() => {
    	let nonDeterministicValues;
    	let nonDeterministicValue;
		ScenarioUtils.getCypressFor(TodoActionIds.init, [`#/category_${testId}`]).should(() => {
		ScenarioUtils.wait(1, 3).should(() => {
		ScenarioUtils.getCypressFor(TodoActionIds.newTodoChanged, [`1st Item ${testId}`]).should(() => {
		ScenarioUtils.wait(1, 0).should(() => {
		nonDeterministicValues = JSON.parse(localStorage.getItem('nonDeterministicValues'));
		if (!nonDeterministicValues) {
			nonDeterministicValues = [];
		}
		nonDeterministicValue = {
			uuid: ``
		};
		nonDeterministicValues.push(nonDeterministicValue);
		nonDeterministicValue = {
			uuid: `${testId}`
		};
		nonDeterministicValues.push(nonDeterministicValue);
		AppUtils.httpPut(`/api/test/non-deterministic/system-time?uuid=${testId}&system-time=${new Date('2020-10-10T14:48:37.000Z').toISOString()}`)
		localStorage.setItem('nonDeterministicValues', JSON.stringify(nonDeterministicValues));
		ScenarioUtils.getCypressFor(TodoActionIds.newTodoKeyPressed, [13]).should(() => {
		ScenarioUtils.wait(1, 4).should(() => {
		ScenarioUtils.getCypressFor(TodoActionIds.newTodoChanged, [`2nd Item ${testId}`]).should(() => {
		ScenarioUtils.wait(1, 0).should(() => {
		nonDeterministicValues = JSON.parse(localStorage.getItem('nonDeterministicValues'));
		if (!nonDeterministicValues) {
			nonDeterministicValues = [];
		}
		nonDeterministicValue = {
			uuid: ``
		};
		nonDeterministicValues.push(nonDeterministicValue);
		nonDeterministicValue = {
			uuid: `${testId}_2`
		};
		nonDeterministicValues.push(nonDeterministicValue);
		AppUtils.httpPut(`/api/test/non-deterministic/system-time?uuid=${testId}_2&system-time=${new Date('2020-10-10T14:58:37.000Z').toISOString()}`)
		localStorage.setItem('nonDeterministicValues', JSON.stringify(nonDeterministicValues));
		ScenarioUtils.getCypressFor(TodoActionIds.newTodoKeyPressed, [13]).should(() => {
		ScenarioUtils.wait(1, 4).should(() => {
		ScenarioUtils.getCypressFor(TodoActionIds.editTodo, [`${testId}`]).should(() => {
		ScenarioUtils.wait(1, 0).should(() => {
		});
		});
		});
		});
		});
		});
		});
		});
		});
		});
		});
		});
    })

    it('editedTodoWasChanged ', () => {
    	
    	ScenarioUtils.getCypressFor(TodoActionIds.editedTodoChanged, [`EDIT 1st Item ${testId}`]).should(() => {
    		ScenarioUtils.wait(1, 0).should(() => {
	            const appState = JSON.parse(localStorage.getItem('appState'))
	            expect(appState.todos, "editedTodoWasChanged").to.eql({ 
	            	editedDescription : `EDIT 1st Item ${testId}`
	            }
	            )
    		})
        })
    })
})




/******* S.D.G. *******/




