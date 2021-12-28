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
    
describe("init.InitAllWithoutCreateCategory", function () {
    beforeAll(async function () {
    	driver = new Builder()
    			    .forBrowser(ScenarioUtils.browserName)
    			    .build();
    	let appState;
		await ScenarioUtils.invokeAction(driver, TodoActionIds.init, [`#/category_${testId}`]);

		await ScenarioUtils.invokeAction(driver, TodoActionIds.init, [`#/category_${testId}`]);
		await ScenarioUtils.waitInMillis(10);
		
		appState = await ScenarioUtils.getAppState(driver);
		appStates.filterWasSet = appState;
		appStates.categoryWasSet = appState;
		appStates.emptyTodoListWasFetched = appState;
		
		
    });

	it("filterWasSet", async () => {
		expect(appStates.filterWasSet.container.filter, "filterWasSet").toEqual(`all`)
	});
	it("categoryWasSet", async () => {
		expect(appStates.categoryWasSet.container.footer.categoryId, "categoryWasSet").toEqual(`category_${testId}`)
	});
	it("emptyTodoListWasFetched", async () => {
		expect(appStates.emptyTodoListWasFetched.container.todos.todoList, "emptyTodoListWasFetched").toEqual([
		]
		)
	});
	

    afterAll(async function () {
        await ScenarioUtils.tearDown(driver);
    });
    
    
});





/******* S.D.G. *******/




