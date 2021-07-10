/********************************************************************************
 * generated by de.acegen 1.3.0
 ********************************************************************************/




const ScenarioUtils = require("../../src/ScenarioUtils");
const TodoActionIds  = require("../../gen/actionIds/todo/TodoActionIds");
const Verifications = require("../../src/init/InitDoneWithOneOpenTodoVerifications");
const { Builder } = require('selenium-webdriver');

jasmine.DEFAULT_TIMEOUT_INTERVAL = ScenarioUtils.defaultTimeout;

const testId = ScenarioUtils.generateTestId();

let driver;

let appState;
    
describe("init.InitDoneWithOneOpenTodo", function () {
    beforeAll(async function () {
    	driver = new Builder()
    			    .forBrowser(ScenarioUtils.browserName)
    			    .build();
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
		await ScenarioUtils.addSquishyValueClient(
			driver,
			{
				uuid: `${testId}_toggle`
			}
		);
		await ScenarioUtils.addSquishyValueServer(driver, `${testId}_toggle`, "system-time", new Date('2020-10-10T15:58:37.000Z').toISOString());
		await ScenarioUtils.invokeAction(driver, TodoActionIds.toggleTodo, [`checkbox_${testId}`]);

		await ScenarioUtils.invokeAction(driver, TodoActionIds.init, [`#/category_${testId}/done`]);
		
		appState = await ScenarioUtils.getAppState(driver);
    });

    afterAll(async function () {
        await ScenarioUtils.tearDown(driver);
    });
    
    
	it("oneTodoDisplayed", async () => {
		await Verifications.oneTodoDisplayed(driver, testId);
	});
    
});





/******* S.D.G. *******/




