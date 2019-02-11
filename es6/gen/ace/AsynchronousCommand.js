/* 
 * Copyright (c) 2019, Annette Pohl, Koblenz, Germany
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.

 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */




import ACEController from "./ACEController";
import Command from "./Command";
import AppUtils from "../../src/app/AppUtils";
import Utils from "./Utils";

export default class AsynchronousCommand extends Command {
    executeCommand() {
        return new Promise((resolve, reject) => {
			if (ACEController.execution !== ACEController.REPLAY) {
				if (this.initCommandData()) {
				    this.execute().then(() => {
				        ACEController.addItemToTimeLine({command: this});
				        this.publishEvents();
				        resolve();
				    }, (error) => {
				        reject(error);
				    });
				} else {
			        ACEController.addItemToTimeLine({command: this});
			        this.publishEvents();
					resolve();
				}
			} else {
			    const timelineCommand = ACEController.getCommandByUuid(this.commandData.uuid);
			    this.commandData = timelineCommand.commandData;
			    ACEController.addItemToTimeLine({command: this});
		        this.publishEvents();
		        resolve();
			}
        });
    }

    initCommandData() {
    	return true;
    }

    adjustedUrl(url) {
        if (ACEController.execution !== ACEController.E2E) {
            return url;
        } else {
            return url.replace('api', 'replay');
        }
    }

    httpGet(url, authorize, queryParams) {
        return Utils.prepareAction(this.commandData.uuid).then(() => {
            queryParams = this.addUuidToQueryParams(queryParams);
            return AppUtils.httpGet(url, authorize, queryParams);
        }, (error) => {
            throw error;
        });
    }

    httpPost(url, authorize, queryParams, data) {
        return Utils.prepareAction(this.commandData.uuid).then(() => {
            queryParams = this.addUuidToQueryParams(queryParams);
            data = this.addUuidToData(data);
            return AppUtils.httpPost(url, authorize, queryParams, data);
        }, (error) => {
            throw error;
        });
    }

    httpPut(url, authorize, queryParams, data) {
        return Utils.prepareAction(this.commandData.uuid).then(() => {
            queryParams = this.addUuidToQueryParams(queryParams);
            data = this.addUuidToData(data);
            return AppUtils.httpPut(url, authorize, queryParams, data);
        }, (error) => {
            throw error;
        });
    }

    httpDelete(url, authorize, queryParams, data) {
        return Utils.prepareAction(this.commandData.uuid).then(() => {
            queryParams = this.addUuidToQueryParams(queryParams);
            data = this.addUuidToData(data);
            return AppUtils.httpDelete(url, authorize, queryParams, data);
        }, (error) => {
            throw error;
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




/******* S.D.G. *******/





