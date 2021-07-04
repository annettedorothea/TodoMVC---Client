/********************************************************************************
 * generated by de.acegen 1.3.0
 ********************************************************************************/




const ScenarioUtils = require("../../src/ScenarioUtils");
const TodoActionIds  = require("../../gen/actionIds/todo/TodoActionIds");
const { Builder } = require('selenium-webdriver');

jasmine.DEFAULT_TIMEOUT_INTERVAL = ScenarioUtils.defaultTimeout;

const testId = ScenarioUtils.generateTestId();

let driver;

let appState;
    
describe("toggleall.WhenFirstIsDoneToggleAllTodos", function () {
    beforeAll(async function () {
    	driver = new Builder()
    			    .forBrowser(ScenarioUtils.browserName)
    			    .build();
		await ScenarioUtils.invokeAction(driver, TodoActionIds.init, [`#/category_${testId}`]);
		await ScenarioUtils.invokeAction(driver, TodoActionIds.newTodoChanged, [`1st Item ${testId}`]);
		await ScenarioUtils.addNonDeterministicValueClient(
			driver,
			{
				uuid: ``
			}
		);
		await ScenarioUtils.addNonDeterministicValueClient(
			driver,
			{
				uuid: `${testId}`
			}
		);
		await ScenarioUtils.addNonDeterministicValueServer(driver, `${testId}`, "system-time", new Date('2020-10-10T14:48:37.000Z').toISOString());
		await ScenarioUtils.invokeAction(driver, TodoActionIds.newTodoKeyPressed, [13]);
		await ScenarioUtils.invokeAction(driver, TodoActionIds.newTodoChanged, [`2nd Item ${testId}`]);
		await ScenarioUtils.addNonDeterministicValueClient(
			driver,
			{
				uuid: ``
			}
		);
		await ScenarioUtils.addNonDeterministicValueClient(
			driver,
			{
				uuid: `${testId}_2`
			}
		);
		await ScenarioUtils.addNonDeterministicValueServer(driver, `${testId}_2`, "system-time", new Date('2020-10-10T14:58:37.000Z').toISOString());
		await ScenarioUtils.invokeAction(driver, TodoActionIds.newTodoKeyPressed, [13]);
		await ScenarioUtils.addNonDeterministicValueClient(
			driver,
			{
				uuid: `${testId}_toggle`
			}
		);
		await ScenarioUtils.addNonDeterministicValueServer(driver, `${testId}_toggle`, "system-time", new Date('2020-10-10T15:58:37.000Z').toISOString());
		await ScenarioUtils.invokeAction(driver, TodoActionIds.toggleTodo, [`checkbox_${testId}`]);

		await ScenarioUtils.addNonDeterministicValueClient(
			driver,
			{
				uuid: `${testId}_toggle-all`
			}
		);
		await ScenarioUtils.addNonDeterministicValueServer(driver, `${testId}_toggle-all`, "system-time", new Date('2020-10-10T17:58:37.000Z').toISOString());
		await ScenarioUtils.invokeAction(driver, TodoActionIds.toggleAll);
		
		appState = await ScenarioUtils.getAppState(driver);
    });

    afterAll(async function () {
        await ScenarioUtils.tearDown(driver);
    });
    
	it("allTodosWereSetToDone", async () => {
		expect(appState.container.todos.todoList, "allTodosWereSetToDone").toEqual([
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
				done : true,
				id : `${testId}_2`,
				updatedDateTime : `2020-10-10T17:58:37`
			}
		]
		)
	});
    
    
});





/******* S.D.G. *******/




