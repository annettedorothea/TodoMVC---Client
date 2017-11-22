import React from 'react';
import ReactMarkdown from 'react-markdown';
import ReplayTimelineRow from "./ReplayTimelineRow";
import ReplayUtils from "../app/ReplayUtils";
import ACEController from "../../gen/ace/ACEController";

export default class ReplayTimeline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pauseInMillis: 20,
            scenarioDescription: ''
        };
        this.changePauseInMillis = this.changePauseInMillis.bind(this);
        this.handleScenarioReplay = this.handleScenarioReplay.bind(this);
        this.handleScenarioE2E = this.handleScenarioE2E.bind(this);
        this.changeScenarioDescription = this.changeScenarioDescription.bind(this);
        this.saveScenario = this.saveScenario.bind(this);
        this.deleteScenario = this.deleteScenario.bind(this);
        this.finishReplayCallback = this.finishReplayCallback.bind(this);
        this.finishE2ECallback = this.finishE2ECallback.bind(this);
    }

    componentDidMount() {
        ReplayUtils.loadScenarios().then((scenarios) => {
            this.setState({
                scenarios
            });
        });
        ReplayUtils.initFinishReplayCallback(this.finishReplayCallback);
        ReplayUtils.initFinishE2ECallback(this.finishE2ECallback);
    }

    finishReplayCallback(result) {
        const scenarios = this.state.scenarios;
        const index = this.state.currentReplayIndex;
        scenarios[index].replayResult = result;
        this.setState({
            scenarios
        });
    }

    finishE2ECallback(result) {
        const scenarios = this.state.scenarios;
        const index = this.state.currentReplayIndex;
        scenarios[index].e2eResult = result;
        this.setState({
            scenarios
        });
    }

    changePauseInMillis(event) {
        this.setState({
            pauseInMillis: event.target.value
        });
    }

    handleScenarioReplay(timeline, index) {
        ACEController.expectedTimeline = JSON.parse(timeline);
        ReplayUtils.replay(this.state.pauseInMillis);
        this.setState({
            currentReplayIndex: index
        });
    }

    handleScenarioE2E(timeline, index) {
        ACEController.expectedTimeline = JSON.parse(timeline);
        ReplayUtils.e2e(this.state.pauseInMillis);
        this.setState({
            currentReplayIndex: index
        });
    }

    changeScenarioDescription(event) {
        this.setState({
            scenarioDescription: event.target.value
        });
    }

    saveScenario() {
        ReplayUtils.saveScenario(this.state.scenarioDescription).then(() => {
            ReplayUtils.loadScenarios().then((scenarios) => {
                this.setState({
                    scenarios,
                    scenarioDescription: ""
                });
            });
        });
    }

    deleteScenario(id) {
        ReplayUtils.deleteScenario(id).then(() => {
            ReplayUtils.loadScenarios().then((scenarios) => {
                this.setState({
                    scenarios,
                    scenarioDescription: ""
                });
            });
        });
    }

    render() {
        let items = [];
        if (this.props.expectedTimeline && this.props.actualTimeline) {
            const size = this.props.expectedTimeline.length > this.props.actualTimeline.length ? this.props.expectedTimeline.length : this.props.actualTimeline.length;
            for (let i = 0; i < size; i++) {
                items.push(<ReplayTimelineRow
                    key={i}
                    expectedItem={this.props.expectedTimeline[i] ? this.props.expectedTimeline[i] : null}
                    actualItem={this.props.actualTimeline[i] ? this.props.actualTimeline[i] : null}
                />);
            }
        }
        else if (this.props.expectedTimeline) {
            for (let i = 0; i < this.props.expectedTimeline.length; i++) {
                items.push(<ReplayTimelineRow
                    key={i}
                    expectedItem={this.props.expectedTimeline[i] ? this.props.expectedTimeline[i] : null}
                    actualItem={null}
                />);
            }
        }
        let scenarios = [];
        if (this.state.scenarios) {
            for (let i = 0; i < this.state.scenarios.length; i++) {
                scenarios.push(<tr key={this.state.scenarios[i].id}>
                    <td className={this.state.scenarios[i].replayResult === false ? "failure" : (this.state.scenarios[i].replayResult === true ? "success" : "")}/>
                    <td className={this.state.scenarios[i].e2eResult === false ? "failure" : (this.state.scenarios[i].e2eResult === true ? "success" : "")}/>
                    <td>{this.state.scenarios[i].id}</td>
                    <td><ReactMarkdown source={this.state.scenarios[i].description}/></td>
                    <td>{new Date(this.state.scenarios[i].createdDateTime).toLocaleDateString()} {new Date(this.state.scenarios[i].createdDateTime).toLocaleTimeString()}</td>
                    <td>
                        <button onClick={() => this.handleScenarioReplay(this.state.scenarios[i].data, i)}>Client
                            replay
                        </button>
                    </td>
                    <td>
                        <button onClick={() => this.handleScenarioE2E(this.state.scenarios[i].data, i)}>E2E replay
                        </button>
                    </td>
                    <td>
                        <button onClick={() => this.deleteScenario(this.state.scenarios[i].id)}>Delete</button>
                    </td>
                </tr>);
            }
        }

        return (
            <div className="replay">
                <div>
                    <textarea onChange={this.changeScenarioDescription} className="scenarioDescription"
                              value={this.state.scenarioDescription}/>
                    <ReactMarkdown className="scenarioDescriptionPreview" source={this.state.scenarioDescription}/>
                </div>

                <div>
                    <button onClick={this.saveScenario}>Save scenario</button>
                </div>

                <div>
                    <label>Pause in millis</label> <input type='text' onChange={this.changePauseInMillis}
                                                          value={this.state.pauseInMillis}/>
                </div>


                <table>
                    <thead>
                    <tr>
                        <th>client replay</th>
                        <th>e2e replay</th>
                        <th>id</th>
                        <th>description</th>
                        <th>time</th>
                        <th/>
                        <th/>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {scenarios}
                    </tbody>
                </table>

                <h1>Replay Timeline</h1>
                <table className="timeline">
                    <thead>
                    <tr>
                        <th>expected</th>
                        <th>actual</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items}
                    </tbody>
                </table>

            </div>
        );
    }
}

