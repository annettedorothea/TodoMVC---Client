/********************************************************************************
 * generated by de.acegen 1.3.0
 ********************************************************************************/




import AbstractCalculateItemCountCommand from "../../../gen/todo/commands/AbstractCalculateItemCountCommand";

export default class CalculateItemCountCommand extends AbstractCalculateItemCountCommand {
    execute(data) {
        data.itemCount = data.todoList.filter(i => i.done === false).length;
    	this.addOkOutcome(data);
    }
}




/******* S.D.G. *******/


