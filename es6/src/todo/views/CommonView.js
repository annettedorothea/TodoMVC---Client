import * as App from "../../app/App";
import AppUtils from "../../app/AppUtils";

export default class CommonView {
    static block() {
        AppUtils.setAppState({
            loading: true
        });
    };

    static unblock() {
        AppUtils.setAppState({
            loading: false
        });
    };
    
}

/*                    S.D.G.                    */
