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
    
describe("cleardone.WhenAllAreDoneClearDone", function () {
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
		await ScenarioUtils.invokeAction(driver, TodoActionIds.toggleAll);

		await ScenarioUtils.invokeAction(driver, TodoActionIds.clearDone);
		await ScenarioUtils.waitInMillis(10);
		
		appState = await ScenarioUtils.getAppState(driver);
		appStates.allWereDeleted = appState;
		
		
    });

	it("allWereDeleted", async () => {
		expect(appStates.allWereDeleted.container.todos.todoList, "allWereDeleted").toEqual([
		]
		)
	});
	

    afterAll(async function () {
        await ScenarioUtils.tearDown(driver);
    });
    
    
});





/******* S.D.G. *******/




