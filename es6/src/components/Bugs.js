import React from 'react';
import ReactMarkdown from 'react-markdown';
import ReplayUtils from "../app/ReplayUtils";
import AppUtils from "../app/AppUtils";
import ACEController from "../../gen/ace/ACEController";

export default class Bugs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pauseInMillis: 20,
            description: '',
            reporter: ''
        };
        this.changeDescription = this.changeDescription.bind(this);
        this.changeReporter = this.changeReporter.bind(this);
        this.changePauseInMillis = this.changePauseInMillis.bind(this);

        this.handleScenarioReplay = this.handleScenarioReplay.bind(this);
        this.handleScenarioE2E = this.handleScenarioE2E.bind(this);
        this.finishReplayCallback = this.finishReplayCallback.bind(this);
        this.finishE2ECallback = this.finishE2ECallback.bind(this);

        this.saveBug = this.saveBug.bind(this);
        this.deleteBug = this.deleteBug.bind(this);
        this.resolveBug = this.resolveBug.bind(this);
    }

    componentDidMount() {
        AppUtils.loadBugs().then((bugs) => {
            this.setState({
                bugs
            });
        });
    }

    handleScenarioReplay(timeline, index) {
        ReplayUtils.initFinishReplayCallback(this.finishReplayCallback);
        ACEController.expectedTimeline = JSON.parse(timeline);
        ReplayUtils.replay(this.state.pauseInMillis);
        this.setState({
            currentReplayIndex: index
        });
    }

    handleScenarioE2E(timeline, index) {
        ReplayUtils.initFinishE2ECallback(this.finishE2ECallback);
        ACEController.expectedTimeline = JSON.parse(timeline);
        ReplayUtils.e2e(this.state.pauseInMillis);
        this.setState({
            currentReplayIndex: index
        });
    }

    finishReplayCallback(result) {
        const bugs = this.state.bugs;
        const index = this.state.currentReplayIndex;
        bugs[index].replayResult = result;
        this.setState({
            bugs
        });
    }

    finishE2ECallback(result) {
        const bugs = this.state.bugs;
        const index = this.state.currentReplayIndex;
        bugs[index].e2eResult = result;
        this.setState({
            bugs
        });
    }

    changePauseInMillis(event) {
        this.setState({
            pauseInMillis: event.target.value
        });
    }

    changeReporter(event) {
        this.setState({
            reporter: event.target.value
        });
    }

    changeDescription(event) {
        this.setState({
            description: event.target.value
        });
    }

    saveBug() {
        AppUtils.saveBug(this.state.description, this.state.reporter).then(() => {
            AppUtils.loadBugs().then((bugs) => {
                this.setState({
                    bugs,
                    description: '',
                    reporter: ''
                });
            });
        });
    }

    deleteBug(id) {
        AppUtils.deleteBug(id).then(() => {
            AppUtils.loadBugs().then((bugs) => {
                this.setState({
                    bugs,
                    description: '',
                    reporter: ''
                });
            });
        });
    }

    resolveBug(id) {
        AppUtils.resolveBug(id).then(() => {
            AppUtils.loadBugs().then((bugs) => {
                this.setState({
                    bugs,
                    description: '',
                    reporter: ''
                });
            });
        });
    }

    render() {
        let bugs = [];
        if (this.state.bugs) {
            for (let i = 0; i < this.state.bugs.length; i++) {
                bugs.push(<tr key={this.state.bugs[i].id}>
                    <td className={this.state.bugs[i].replayResult === false ? "failure" : (this.state.bugs[i].replayResult === true ? "success" : "")}/>
                    <td className={this.state.bugs[i].e2eResult === false ? "failure" : (this.state.bugs[i].e2eResult === true ? "success" : "")}/>
                    <td>{this.state.bugs[i].id}</td>
                    <td>{this.state.bugs[i].resolved === true ? 'resolved' : 'pending'}</td>
                    <td>{this.state.bugs[i].reporter}</td>
                    <td><ReactMarkdown source={this.state.bugs[i].description}/></td>
                    <td>{new Date(this.state.bugs[i].createdDateTime).toLocaleDateString()} {new Date(this.state.bugs[i].createdDateTime).toLocaleTimeString()}</td>
                    <td>{this.state.bugs[i].updatedDateTime ? new Date(this.state.bugs[i].updatedDateTime).toLocaleDateString() : ''} {this.state.bugs[i].updatedDateTime ? new Date(this.state.bugs[i].updatedDateTime).toLocaleTimeString() : ''}</td>
                    <td>
                        <button onClick={() => this.handleScenarioReplay(this.state.bugs[i].data, i)}>Client replay
                        </button>
                        <button onClick={() => this.handleScenarioE2E(this.state.bugs[i].data, i)}>E2E replay</button>
                        <button onClick={() => this.resolveBug(this.state.bugs[i].id)}>Resolve</button>
                        <button onClick={() => this.deleteBug(this.state.bugs[i].id)}>Delete</button>
                    </td>
                </tr>);
            }
        }

        return (
            <div className="bugs">
                <h1>Create bug from current timeline</h1>
                <div className="row">
                    <div className="bugDescription col">
                        <textarea onChange={this.changeDescription}
                                  value={this.state.description}/>
                    </div>
                    <div className="bugDescriptionPreview col">
                        <ReactMarkdown source={this.state.description}/>
                    </div>
                </div>
                <div>
                    <label>Reporter</label> <input type='text' onChange={this.changeReporter}
                                                   value={this.state.reporter}/>
                </div>

                <div>
                    <button onClick={this.saveBug}>Save Bug</button>
                </div>

                <div>
                    <label>Pause in millis</label> <input type='text' onChange={this.changePauseInMillis}
                                                          value={this.state.pauseInMillis}/>
                </div>


                <h1>Bugs</h1>
                <table>
                    <thead>
                    <tr>
                        <th className="w-05">client replay</th>
                        <th className="w-05">e2e replay</th>
                        <th className="w-05">id</th>
                        <th className="w-05">status</th>
                        <th className="w-20">description</th>
                        <th className="w-10">reporter</th>
                        <th className="w-10">created</th>
                        <th className="w-10">updated</th>
                        <th className="w-30"/>
                    </tr>
                    </thead>
                    <tbody>
                    {bugs}
                    </tbody>
                </table>

            </div>
        );
    }
}

