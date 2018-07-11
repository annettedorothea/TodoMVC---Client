import AppUtils from "../../app/AppUtils";

export default class FooterView {

    static initFilter(eventData) {
        AppUtils.setAppState({
            filter: eventData.filter
        });
    };

}

/*                    S.D.G.                    */
