/********************************************************************************
 * generated by de.acegen
 ********************************************************************************/




import * as AppUtils from "../../src/AppUtils";
import * as AppState from "../../src/AppState";
import * as ACEController from "./ACEController";

function getServerInfo() {
    return AppUtils.httpGet(AppUtils.settings.rootPath + '/server/info');
}

export function saveTimeline(description, creator) {
    return getServerInfo().then((serverInfo) => {
        const browser = getBrowserInfo();
        const uuid = AppUtils.createUUID();
		const currentAppState = {
		    appState: AppState.get([])
		};
		const currentTimeline = AppUtils.deepCopy(ACEController.timeline);
		currentTimeline.push(AppUtils.deepCopy(currentAppState));
        const data = {
            description,
            timeline: JSON.stringify(currentTimeline),
            creator,
            clientVersion: AppUtils.settings.clientVersion,
            device: browser.name + " " + browser.version,
            apiKey: AppUtils.settings.aceScenariosApiKey,
            serverVersion: serverInfo.serverVersion
        };
        return AppUtils.httpPost(AppUtils.settings.aceScenariosBaseUrl + 'api/client-timeline/create', uuid, false, data).then(() => {
            return new Promise((resolve) => {
                resolve(uuid);
            });
        });
    });
}

export function loadTimeline(id) {
    return AppUtils.httpGet(AppUtils.settings.aceScenariosBaseUrl + `api/timeline?id=${id}&apiKey=${AppUtils.settings.aceScenariosApiKey}`, AppUtils.createUUID(), false);
}

function getBrowserInfo() {
    let ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name: 'IE ', version: (tem[1] || '')};
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem != null) {
            return {name: 'Opera', version: tem[1]};
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return {
        name: M[0],
        version: M[1]
    };
}




/******* S.D.G. *******/





