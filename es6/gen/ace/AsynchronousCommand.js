import ACEController from "./ACEController";
import Command from "./Command";
import AppUtils from "../../src/app/AppUtils";
import Utils from "./Utils";

export default class AsynchronousCommand extends Command {
    executeCommand() {
        return new Promise((resolve, reject) => {
            if (ACEController.execution !== ACEController.REPLAY) {
                this.execute().then(() => {
                    ACEController.addItemToTimeLine({command: this});
                    this.publishEvents().then(() => {
                        if (ACEController.execution === ACEController.LIVE) {
                            ACEController.applyNextActions();
                        } else {
                            setTimeout(ACEController.applyNextActions, ACEController.pauseInMillis);
                        }
                        resolve();
                    }, (error) => {
                        if (ACEController.execution === ACEController.LIVE) {
                            ACEController.applyNextActions();
                        } else {
                            setTimeout(ACEController.applyNextActions, ACEController.pauseInMillis);
                        }
                        reject(error + "\n" + this.commandName);
                    });
                }, (error) => {
                    if (ACEController.execution === ACEController.LIVE) {
                        ACEController.applyNextActions();
                    } else {
                        setTimeout(ACEController.applyNextActions, ACEController.pauseInMillis);
                    }
                    reject(error + "\n" + this.commandName);
                });
            } else {
                const timelineCommand = ACEController.getCommandByUuid(this.commandData.uuid);
                this.commandData = timelineCommand.commandData;
                ACEController.addItemToTimeLine({command: this});
                this.publishEvents().then(() => {
                    setTimeout(ACEController.applyNextActions, ACEController.pauseInMillis);
                    resolve();
                }, (error) => {
                    setTimeout(ACEController.applyNextActions, ACEController.pauseInMillis);
                    reject(error + "\n" + this.commandName);
                });
            }
        });
    }

    httpGet(url, queryParams) {
        return Utils.prepareAction(this.commandData.uuid).then(() => {
            queryParams = this.addUuidToQueryParams(queryParams);
            return AppUtils.httpGet(url, queryParams, this.commandData);
        }, (error) => {
            reject(error);
        });
    }

    httpPost(url, queryParams, data) {
        return Utils.prepareAction(this.commandData.uuid).then(() => {
            queryParams = this.addUuidToQueryParams(queryParams);
            data = this.addUuidToData(data);
            return AppUtils.httpPost(url, queryParams, data, this.commandData);
        }, (error) => {
            reject(error);
        });
    }

    httpPut(url, queryParams, data) {
        return Utils.prepareAction(this.commandData.uuid).then(() => {
            queryParams = this.addUuidToQueryParams(queryParams);
            data = this.addUuidToData(data);
            return AppUtils.httpPut(url, queryParams, data, this.commandData);
        }, (error) => {
            reject(error);
        });
    }

    httpDelete(url, queryParams, data) {
        return Utils.prepareAction(this.commandData.uuid).then(() => {
            queryParams = this.addUuidToQueryParams(queryParams);
            data = this.addUuidToData(data);
            return AppUtils.httpDelete(url, queryParams, data, this.commandData);
        }, (error) => {
            reject(error);
        });
    }

    addUuidToQueryParams(queryParams) {
        if (!queryParams) {
            queryParams = [];
        }
        if (this.commandData.uuid) {
            queryParams.push({
                key: "uuid",
                value: this.commandData.uuid
            });
        }
        return queryParams;
    }

    addUuidToData(data) {
        if (!data) {
            data = {};
        }
        if (this.commandData.uuid) {
            data.uuid = this.commandData.uuid;
        }
        return data;
    }

}

/*       S.D.G.       */


