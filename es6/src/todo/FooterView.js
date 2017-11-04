import * as App from "../../app/App";

export default class FooterView {
    static initFilter(eventData) {
        App.container.setState({
            filter: eventData.filter
        });
    };

}

/*                    S.D.G.                    */
