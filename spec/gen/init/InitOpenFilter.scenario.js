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
    
describe("init.InitOpenFilter", function () {
    beforeAll(async function () {
    	driver = new Builder()
    			    .forBrowser(ScenarioUtils.browserName)
    			    .build();
		await ScenarioUtils.invokeAction(driver, TodoActionIds.init, [`#/category_${testId}`]);

		await ScenarioUtils.invokeAction(driver, TodoActionIds.init, [`#/category_${testId}/open`]);
		
		appState = await ScenarioUtils.getAppState(driver);
    });

    afterAll(async function () {
        await ScenarioUtils.tearDown(driver);
    });
    
	it("filterWasSet", async () => {
		expect(appState.container.filter, "filterWasSet").toEqual(`open`)
	});
	it("categoryWasSet", async () => {
		expect(appState.container.footer.categoryId, "categoryWasSet").toEqual(`category_${testId}`)
	});
	it("emptyTodoListWasFetched", async () => {
		expect(appState.container.todos.todoList, "emptyTodoListWasFetched").toEqual([
		]
		)
	});
    
    
});





/******* S.D.G. *******/




