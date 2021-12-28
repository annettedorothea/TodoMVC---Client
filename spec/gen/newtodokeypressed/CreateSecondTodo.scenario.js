/********************************************************************************
 * generated by de.acegen
 ********************************************************************************/




const ScenarioUtils = require("../../src/ScenarioUtils");
const TodoActionIds  = require("../../gen/actionIds/todo/TodoActionIds");
const { Builder } = require('selenium-webdriver');

jasmine.DEFAULT_TIMEOUT_INTERVAL = ScenarioUtils.defaultTimeout;

const testId = ScenarioUtils.generateTestId();

let driver;

let appStates = {};
let verifications = {};
    
describe("newtodokeypressed.CreateSecondTodo", function () {
    beforeAll(async function () {
    	driver = new Builder()
    			    .forBrowser(ScenarioUtils.browserName)
    			    .build();
    	let appState;
		await ScenarioUtils.invokeAction(driver, TodoActionIds.init, [`#/category_${testId}`]);
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
		await ScenarioUtils.addSquishyValueServer(driver, `${testId}`, "system-time", new Date('2020-10-10T14:48:37.000Z').toISOString());
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
		await ScenarioUtils.addSquishyValueServer(driver, `${testId}_2`, "system-time", new Date('2020-10-10T14:58:37.000Z').toISOString());
		await ScenarioUtils.invokeAction(driver, TodoActionIds.newTodoKeyPressed, [13]);
		await ScenarioUtils.waitInMillis(10);
		
		appState = await ScenarioUtils.getAppState(driver);
		appStates.todoWasCreatedAndReturedInTodoList = appState;
		appStates.newTodoWasReset = appState;
		
		
    });

	it("todoWasCreatedAndReturedInTodoList", async () => {
		expect(appStates.todoWasCreatedAndReturedInTodoList.container.todos.todoList, "todoWasCreatedAndReturedInTodoList").toEqual([
			{ 
				categoryId : `category_${testId}`,
				createdDateTime : `2020-10-10T14:48:37`,
				description : `1st Item ${testId}`,
				done : false,
				id : `${testId}`,
				updatedDateTime : null
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
	});
	it("newTodoWasReset", async () => {
		expect(appStates.newTodoWasReset.container.newTodoInput.newTodo, "newTodoWasReset").toEqual(``)
	});
	

    afterAll(async function () {
        await ScenarioUtils.tearDown(driver);
    });
    
    
});





/******* S.D.G. *******/




