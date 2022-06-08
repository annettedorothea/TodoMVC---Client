/********************************************************************************
 * generated by de.acegen
 ********************************************************************************/




const ScenarioUtils = require("../../src/ScenarioUtils");
const TodoActionIds  = require("../../gen/actionIds/todo/TodoActionIds");
const InitActionIds  = require("../../gen/actionIds/init/InitActionIds");

jasmine.DEFAULT_TIMEOUT_INTERVAL = ScenarioUtils.defaultTimeout;

const testId = ScenarioUtils.generateTestId();

let driver;

let appStates = {};
let verifications = {};
    
describe("delete.DeleteTodo", function () {
    beforeAll(async function () {
    	driver = ScenarioUtils.createDriver();
    	let appState;
		await ScenarioUtils.invokeAction(driver, InitActionIds.setHash, [`#/category_${testId}`]);
		await ScenarioUtils.invokeAction(driver, TodoActionIds.newTodoChanged, [`1st Item ${testId}`]);
		await ScenarioUtils.addSquishyValueClient(
			driver,
			{
				uuid: ``
			}
		);
		await ScenarioUtils.addSquishyValueClient(
			driver,
			{
				uuid: `${testId}`
			}
		);
		await ScenarioUtils.invokeAction(driver, TodoActionIds.newTodoKeyPressed, [13]);
		await ScenarioUtils.invokeAction(driver, TodoActionIds.newTodoChanged, [`2nd Item ${testId}`]);
		await ScenarioUtils.addSquishyValueClient(
			driver,
			{
				uuid: ``
			}
		);
		await ScenarioUtils.addSquishyValueClient(
			driver,
			{
				uuid: `${testId}_2`
			}
		);
		await ScenarioUtils.invokeAction(driver, TodoActionIds.newTodoKeyPressed, [13]);

		await ScenarioUtils.invokeAction(driver, TodoActionIds.deleteTodo, [`${testId}`]);
		await ScenarioUtils.waitInMillis(10);
		
		appState = await ScenarioUtils.getAppState(driver);
		appStates.todoWasDeleted = appState;
		
		
    });

	it("todoWasDeleted", async () => {
		expect(appStates.todoWasDeleted.container.todos.todoList, "todoWasDeleted").toEqual([
			{ 
				description : `2nd Item ${testId}`,
				descriptionInput : { 
					editedDescription : `2nd Item ${testId}`
				},
				
				done : false,
				id : `${testId}_2`,
				readOnly : true
			}
		]
		)
	});
	

    afterAll(async function () {
        await ScenarioUtils.tearDown(driver);
    });
    
    
});





/******* S.D.G. *******/




