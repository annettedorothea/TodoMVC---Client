/********************************************************************************
 * generated by de.acegen 1.1.0
 ********************************************************************************/




import * as ScenarioUtils from "../../../acegen/src/ScenarioUtils";
import AppUtils from "../../../../es6/src/app/AppUtils";
import * as TodoActionIds from "../../../acegen/gen/todo/TodoActionIds";

const testId = ScenarioUtils.testId();

context('ToggleTodo', () => {
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

    it('todoWasSetToDone ', () => {
		let nonDeterministicValues;
		let nonDeterministicValue;
    	nonDeterministicValues = JSON.parse(localStorage.getItem('nonDeterministicValues'));
    	if (!nonDeterministicValues) {
    		nonDeterministicValues = [];
    	}
    	nonDeterministicValue = {
    		uuid: `${testId}_toggle`
    	};
    	nonDeterministicValues.push(nonDeterministicValue);
    	AppUtils.httpPut(`/api/test/non-deterministic/system-time?uuid=${testId}_toggle&system-time=${new Date('2020-10-10T15:58:37.000Z').toISOString()}`)
    	localStorage.setItem('nonDeterministicValues', JSON.stringify(nonDeterministicValues));
    	
    	ScenarioUtils.getCypressFor(TodoActionIds.toggleTodo, [`${testId}`]).should(() => {
    		ScenarioUtils.wait(0, 4).should(() => {
	            const appState = JSON.parse(localStorage.getItem('appState'))
	            expect(appState.todoList, "todoWasSetToDone").to.eql([
	            	{ 
	            		categoryId : `category_${testId}`,
	            		createdDateTime : `2020-10-10T14:48:37`,
	            		description : `1st Item ${testId}`,
	            		done : true,
	            		id : `${testId}`,
	            		updatedDateTime : `2020-10-10T15:58:37`
	            	},
	            	{ 
	            		categoryId : `category_${testId}`,
	            		createdDateTime : `2020-10-10T14:58:37`,
	            		description : `2nd Item ${testId}`,
	            		done : false,
	            		id : `${testId}_2`,
	            		updatedDateTime : null
	            	}
	            ]
	            )
    		})
        })
    })
})




/******* S.D.G. *******/




