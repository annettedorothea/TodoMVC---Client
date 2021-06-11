/********************************************************************************
 * generated by de.acegen 1.2.1
 ********************************************************************************/




const ScenarioUtils = require("../../src/ScenarioUtils");
const TodoActionIds  = require("../../gen/actionIds/todo/TodoActionIds");
const { Builder } = require('selenium-webdriver');

jasmine.DEFAULT_TIMEOUT_INTERVAL = ScenarioUtils.defaultTimeout;

const testId = ScenarioUtils.generateTestId();

let driver;

let appState;
    
describe("cleardone.WhenAllAreDoneClearDone", function () {
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
				uuid: `${testId}_toggle-all`
			}
		);
		await ScenarioUtils.addNonDeterministicValueServer(driver, `${testId}_toggle-all`, "system-time", new Date('2020-10-10T16:58:37.000Z').toISOString());
		await ScenarioUtils.invokeAction(driver, TodoActionIds.toggleAll);

		await ScenarioUtils.invokeAction(driver, TodoActionIds.clearDone);
		
		appState = await ScenarioUtils.getAppState(driver);
    });

    afterAll(async function () {
        await ScenarioUtils.tearDown(driver);
    });
    
	it("allWereDeleted", async () => {
		expect(appState.container.todos.todoList, "allWereDeleted").toEqual([
		]
		)
	});
    
    
});





/******* S.D.G. *******/




