import AppUtils from "../../app/AppUtils";
import * as App from "../../app/App";

export default class FooterView {

    static initFilter(eventData) {
        App.mergeState({
            filter: eventData.filter,
            todoList: [],
            newTodo: "",
            loading: undefined

        });
    };

}

/*                    S.D.G.                    */
