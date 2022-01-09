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
    
describe("newtodokeypressed.EscTodoCreation", function () {
    beforeAll(async function () {
    	driver = new Builder()
    			    .forBrowser(ScenarioUtils.browserName)
    			    .build();
    	let appState;
		await ScenarioUtils.invokeAction(driver, TodoActionIds.init, [`#/category_${testId}`]);
		await ScenarioUtils.invokeAction(driver, TodoActionIds.newTodoChanged, [`1st Item ${testId}`]);

		await ScenarioUtils.invokeAction(driver, TodoActionIds.newTodoKeyPressed, [27]);
		await ScenarioUtils.waitInMillis(10);
		
		appState = await ScenarioUtils.getAppState(driver);
		appStates.todoWasNotCreatedAndReturedInTodoList = appState;
		appStates.newTodoWasReset = appState;
		
		
    });

	it("todoWasNotCreatedAndReturedInTodoList", async () => {
		expect(appStates.todoWasNotCreatedAndReturedInTodoList.container.todos.todoList, "todoWasNotCreatedAndReturedInTodoList").toEqual([
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




