

const { By, until } = require('selenium-webdriver');

module.exports = {
    twoTodosAreDisplayed: async function (driver, testId) {
        return await verifyNumberOfTodos(driver, 2);
    },
    oneTodoDisplayed: async function (driver, testId) {
        return await verifyNumberOfTodos(driver, 1);
    },
    noTodoDisplayed: async function (driver, testId) {
        return await verifyNumberOfTodos(driver, 0);
    },
}

async function verifyNumberOfTodos(driver, number) {
    const todos = await driver.findElements(By.css('.todo-list li'));
    return number === todos.length;
}