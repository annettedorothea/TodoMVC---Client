/********************************************************************************
 * generated by de.acegen 1.5.6
 ********************************************************************************/




const ScenarioUtils = require("../../src/ScenarioUtils");
const TodoActionIds  = require("../../gen/actionIds/todo/TodoActionIds");
const { Builder } = require('selenium-webdriver');

jasmine.DEFAULT_TIMEOUT_INTERVAL = ScenarioUtils.defaultTimeout;

const testId = ScenarioUtils.generateTestId();

let driver;

let appState;
    
describe("edittodokeypressed.UpdateFirstTodo", function () {
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
		await ScenarioUtils.invokeAction(driver, TodoActionIds.editTodo, [`${testId}`]);
		await ScenarioUtils.invokeAction(driver, TodoActionIds.editedTodoChanged, [`EDIT 1st Item ${testId}`]);

		await ScenarioUtils.addSquishyValueClient(
			driver,
			{
				uuid: ``
			}
		);
		await ScenarioUtils.addSquishyValueClient(
			driver,
			{
				uuid: `${testId}_update`
			}
		);
		await ScenarioUtils.addSquishyValueServer(driver, `${testId}_update`, "system-time", new Date('2020-10-10T15:48:37.000Z').toISOString());
		await ScenarioUtils.invokeAction(driver, TodoActionIds.editedTodoKeyPressed, [13]);
		
		appState = await ScenarioUtils.getAppState(driver);
    });

    afterAll(async function () {
        await ScenarioUtils.tearDown(driver);
    });
    
	it("editedTodoIdWasReset", async () => {
		expect(appState.container.todos.editedTodoId, "editedTodoIdWasReset").toEqual(null)
	});
	it("editedDescriptionWasReset", async () => {
		expect(appState.container.todos.editedDescription, "editedDescriptionWasReset").toEqual(``)
	});
	it("todoWasUpdated", async () => {
		expect(appState.container.todos.todoList, "todoWasUpdated").toEqual([
			{ 
				categoryId : `category_${testId}`,
				createdDateTime : `2020-10-10T14:48:37`,
				description : `EDIT 1st Item ${testId}`,
				done : false,
				id : `${testId}`,
				updatedDateTime : `2020-10-10T15:48:37`
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
    
    
});





/******* S.D.G. *******/




