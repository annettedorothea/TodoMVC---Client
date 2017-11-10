import * as App from "../../app/App";

export default class CommonView {
    static block() {
        App.container.setState({
            loading: true
        });
    };
    
    static unblock() {
        App.container.setState({
            loading: false
        });
    };
    
}

/*                    S.D.G.                    */
