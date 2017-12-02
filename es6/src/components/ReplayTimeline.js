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
                        <button onClick={() => this.handleScenarioE2E(this.state.scenarios[i].data, i)}>E2E replay
                        </button>
                        <button onClick={() => this.deleteScenario(this.state.scenarios[i].id)}>Delete</button>
                    </td>
                </tr>);
            }
        }

        return (
            <div className="replay">
                {items.length > 0 &&
                    <div>
                        <h1>Replay Timeline</h1>
                        <table className="timelineTable">
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
                }

                <h1>Create scenario from current timeline</h1>
                <div className="row">
                    <div className="scenarioDescription col">
                        <textarea onChange={this.changeScenarioDescription}
                                  value={this.state.scenarioDescription}/>
                    </div>
                    <div className="scenarioDescriptionPreview col">
                        <ReactMarkdown source={this.state.scenarioDescription}/>
                    </div>
                </div>

                <div>
                    <button onClick={this.saveScenario}>Save scenario</button>
                </div>

                <div>
                    <label>Pause in millis</label> <input type='text' onChange={this.changePauseInMillis}
                                                          value={this.state.pauseInMillis}/>
                </div>


                <h1>Scenarios</h1>
                <table>
                    <thead>
                    <tr>
                        <th className="w-10">client replay</th>
                        <th className="w-10">e2e replay</th>
                        <th className="w-10">id</th>
                        <th className="w-30">description</th>
                        <th className="w-10">time</th>
                        <th className="w-30"/>
                    </tr>
                    </thead>
                    <tbody>
                    {scenarios}
                    </tbody>
                </table>

            </div>
        );
    }
}

