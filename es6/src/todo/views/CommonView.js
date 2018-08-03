import * as App from "../../app/App";
import AppUtils from "../../app/AppUtils";

export default class CommonView {
    static block() {
        App.deepMergeState({
            loading: true
        });
    };

    static unblock() {
        App.deepMergeState({
            loading: false
        });
    };
    
}

/*                    S.D.G.                    */
