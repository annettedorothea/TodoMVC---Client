import ACEController from "./ACEController";
import AppUtils from "../../src/app/AppUtils";
import ReplayUtils from "../../src/app/ReplayUtils";

export default class Command {
    constructor(commandParam, commandName) {
        this.commandName = commandName;
        this.commandParam = JSON.parse(JSON.stringify(commandParam));
        this.commandData = {};
    }

    execute() {
        throw "no execute method defined for " + this.commandName;
    }

    publishEvents() {
        throw "no publishEvents method defined for " + this.commandName;
    }

    executeCommand(postUpdateUI) {
        return new Promise((resolve, reject) => {
            if (ACEController.execution !== ACEController.REPLAY) {
                this.execute().then(() => {
                    ACEController.addItemToTimeLine({command: this});
                    this.publishEvents().then(() => {
						postUpdateUI();
						if (ACEController.execution === ACEController.LIVE) {
						    ACEController.applyNextActions();
						} else {
						    setTimeout(ACEController.applyNextActions, ACEController.pauseInMillis);
						}
						resolve();
                    }, (error) => {
                        reject(error + " when publishing events of command " + this.commandName);
                    });
                }, (error) => {
                    reject(error + " when executing command " + this.commandName);
                });
            } else {
                const timelineCommand = ACEController.getCommandByUuid(this.commandParam.uuid);
                this.commandData = timelineCommand.commandData;
                ACEController.addItemToTimeLine({command: this});
                this.publishEvents().then(() => {
					postUpdateUI();
					setTimeout(ACEController.applyNextActions, ACEController.pauseInMillis);
					resolve();
                }, (error) => {
                    reject(error + " when publishing events of command " + this.commandName);
                });
            }
        });
    }

    httpGet(url, queryParams) {
        return ReplayUtils.prepareAction(this.commandParam.uuid).then(() => {
            queryParams = this.addUuidToQueryParams(queryParams);
            return AppUtils.httpGet(url, queryParams, this.commandParam);
        }, (error) => {
            reject(error);
        });
    }

    httpPost(url, queryParams, data) {
        return ReplayUtils.prepareAction(this.commandParam.uuid).then(() => {
            queryParams = this.addUuidToQueryParams(queryParams);
            data = this.addUuidToData(data);
            return AppUtils.httpPost(url, queryParams, data, this.commandParam);
        }, (error) => {
            reject(error);
        });
    }

    httpPut(url, queryParams, data) {
        return ReplayUtils.prepareAction(this.commandParam.uuid).then(() => {
            queryParams = this.addUuidToQueryParams(queryParams);
            data = this.addUuidToData(data);
            return AppUtils.httpPut(url, queryParams, data, this.commandParam);
        }, (error) => {
            reject(error);
        });
    }

    httpDelete(url, queryParams, data) {
        return ReplayUtils.prepareAction(this.commandParam.uuid).then(() => {
            queryParams = this.addUuidToQueryParams(queryParams);
            data = this.addUuidToData(data);
            return AppUtils.httpDelete(url, queryParams, data, this.commandParam);
        }, (error) => {
            reject(error);
        });
    }

    addUuidToQueryParams(queryParams) {
        if (!queryParams) {
            queryParams = [];
        }
        if (this.commandParam.uuid) {
            queryParams.push({
                key: "uuid",
                value: this.commandParam.uuid
            });
        }
        return queryParams;
    }

    addUuidToData(data) {
        if (!data) {
            data = {};
        }
        if (this.commandParam.uuid) {
            data.uuid = this.commandParam.uuid;
        }
        return data;
    }

}

/*       S.D.G.       */

