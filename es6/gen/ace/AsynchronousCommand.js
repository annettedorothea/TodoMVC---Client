/* 
 * Copyright (c) 2020, Annette Pohl, Koblenz, Germany
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
 *
 * generated with de.acegen 0.9.8
 *
 */




import ACEController from "./ACEController";
import Command from "./Command";
import AppUtils from "../../src/app/AppUtils";
import Utils from "./Utils";

export default class AsynchronousCommand extends Command {
    executeCommand() {
        return new Promise((resolve, reject) => {
			if (ACEController.execution !== ACEController.REPLAY) {
				if (this.validateCommandData()) {
				    this.execute().then(() => {
				        ACEController.addItemToTimeLine({command: this});
				        this.publishEvents();
				        resolve();
				    }, (error) => {
				    	ACEController.addItemToTimeLine({command: this});
				        reject(error);
				    });
				} else {
			        ACEController.addItemToTimeLine({command: this});
			        this.publishEvents();
					resolve();
				}
			} else {
				const timelineCommand = ACEController.getCommandByUuid(this.commandData.uuid);
				if (timelineCommand) {
				    if (timelineCommand.commandData.error) {
				        reject(timelineCommand.commandData.error);
				    } else {
				        this.commandData = timelineCommand.commandData;
				        ACEController.addItemToTimeLine({command: this});
				        this.publishEvents();
				        resolve();
				    }
				} else {
				    resolve();
				}
			}
        });
    }

    validateCommandData() {
    	return true;
    }

    httpGet(url, authorize) {
        return Utils.prepareAction(this.commandData.uuid).then(() => {
            return AppUtils.httpGet(url, authorize);
        }, (error) => {
            throw error;
        });
    }

    httpPost(url, authorize, data) {
        return Utils.prepareAction(this.commandData.uuid).then(() => {
            return AppUtils.httpPost(url, authorize, data);
        }, (error) => {
            throw error;
        });
    }

    httpPut(url, authorize, data) {
        return Utils.prepareAction(this.commandData.uuid).then(() => {
            return AppUtils.httpPut(url, authorize, data);
        }, (error) => {
            throw error;
        });
    }

    httpDelete(url, authorize, data) {
        return Utils.prepareAction(this.commandData.uuid).then(() => {
            return AppUtils.httpDelete(url, authorize, data);
        }, (error) => {
            throw error;
        });
    }

}




/******* S.D.G. *******/





