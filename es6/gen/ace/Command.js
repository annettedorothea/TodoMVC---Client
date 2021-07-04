/********************************************************************************
 * generated by de.acegen 1.3.0
 ********************************************************************************/




import * as AppUtils from "../../src/app/AppUtils";

export default class Command {
    constructor(commandData, commandName) {
        this.commandName = commandName;
        this.commandData = AppUtils.deepCopy(commandData);
    }

    execute() {
        throw "no execute method defined for " + this.commandName;
    }

    publishEvents() {
        throw "no publishEvents method defined for " + this.commandName;
    }

}




/******* S.D.G. *******/



