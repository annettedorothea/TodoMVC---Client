/********************************************************************************
 * generated by de.acegen 1.2.1
 ********************************************************************************/

const {By, until} = require('selenium-webdriver');


const TodoActionIds = require("../gen/actionIds/todo/TodoActionIds");

module.exports = {
    tearDown: async function (driver) {
        await driver.quit();
    },

    invokeAction: async function (driver, action, args) {
        if (TodoActionIds.init === action) {
            await driver.get('http://127.0.0.1:9999/' + args[0]);
            await this.waitInMillis(500);
        }
        if (TodoActionIds.newTodoChanged === action) {
            await waitClearSendKeys(driver, "newTodoInput", args[0])
        }
        if (TodoActionIds.newTodoKeyPressed === action) {
            await driver.wait(until.elementLocated(By.id("newTodoInput")), 5000);
            if (args[0] === 13) {
                await pressEnter(driver, "newTodoInput", this.browserName)
            }
            await this.waitInMillis(500);
        }
        if (TodoActionIds.toggleAll === action) {
            await click(driver, ".toggle-all");
            await this.waitInMillis(500);
        }
        if (TodoActionIds.toggleTodo === action) {
            await click(driver, "#" + args[0]);
            await this.waitInMillis(500);
        }
        if (TodoActionIds.clearDone === action) {
            await click(driver, ".clear-completed");
            await this.waitInMillis(500);
        }
        if (TodoActionIds.deleteTodo === action) {
            await click(driver, "#delete_" + args[0]);
            await this.waitInMillis(500);
        }
        if (TodoActionIds.editTodo === action) {
            await dblClick(driver, "#edit_" + args[0]);
            await this.waitInMillis(500);
        }
        if (TodoActionIds.editedTodoChanged === action) {
            await waitClearSendKeys(driver, "editedTodo", args[0]);
        }
        if (TodoActionIds.editedTodoKeyPressed === action) {
            await driver.wait(until.elementLocated(By.id("editedTodo")), 5000);
            if (args[0] === 13) {
                await pressEnter(driver, "editedTodo", this.browserName)
            }
            await this.waitInMillis(500);
        }
    },

    waitInMillis: async function (millis) {
        return new Promise(function (resolve) {
            setTimeout(resolve, millis);
        });
    },

    getAppState: async function (driver) {
        return await driver.executeScript('return Todo.getAppState()');
    },

    generateTestId: function () {
        let d = new Date().getTime();
        return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    },

    addNonDeterministicValueClient: async function (driver, value) {
        const jsonValue = JSON.stringify(value);
        await driver.executeScript(`Todo.addNonDeterministicValueClient('${jsonValue}')`);
    },

    addNonDeterministicValueServer: async function (driver, uuid, key, value) {
        await driver.executeScript(`Todo.addNonDeterministicValueServer("${uuid}", "${key}", "${value}")`);
    },

    defaultTimeout: 30 * 1000,

    //browserName: "firefox"
    browserName: "chrome"

}

async function waitClearSendKeys(driver, id, value) {
    await driver.wait(until.elementLocated(By.id(id)), 5000);
    await driver.findElement(By.id(id)).clear();
    await driver.findElement(By.id(id)).sendKeys(value);
}

async function click(driver, css) {
    await driver.wait(until.elementLocated(By.css(css)), 5000);
    await driver.findElement(By.css(css)).click();
}

async function dblClick(driver, css) {
    await driver.wait(until.elementLocated(By.css(css)), 5000);
    let element = driver.findElement(By.css(css));
    const actions = driver.actions({async: true});
    await actions.doubleClick(element).perform();
}

async function pressEnter(driver, id, browserName) {
    if (browserName === "chrome") {
        await driver.findElement(By.id(id)).sendKeys("\n");
    } else if (browserName === "firefox") {
        await driver.findElement(By.id(id)).sendKeys(String.fromCharCode(13));
    }
}


/******* S.D.G. *******/




