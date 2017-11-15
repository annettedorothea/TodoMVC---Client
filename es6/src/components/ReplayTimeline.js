import React from 'react';
import ReplayTimelineRow from "./ReplayTimelineRow";
import ReplayUtils from "../app/ReplayUtils";
import ACEController from "../../gen/ace/ACEController";

export default class ReplayTimeline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pauseInMillis: 200
        };
        this.changePauseInMillis = this.changePauseInMillis.bind(this);
        this.handleScenarioReplay = this.handleScenarioReplay.bind(this);
        this.handleScenarioE2E = this.handleScenarioE2E.bind(this);
    }

    componentDidMount() {
        ReplayUtils.loadScenarios().then((scenarios) => {
            this.setState({
                scenarios
            });
        });
    }

    changePauseInMillis(event) {
        this.setState({
            pauseInMillis: event.target.value
        });
    }

    handleScenarioReplay(timeline) {
        ACEController.expectedTimeline = JSON.parse(timeline);
        ACEController.replay(this.state.pauseInMillis);
    }

    handleScenarioE2E(timeline) {
        ACEController.expectedTimeline = JSON.parse(timeline);
        ACEController.e2e(this.state.pauseInMillis);
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
                    <td>{this.state.scenarios[i].id}</td>
                    <td>{this.state.scenarios[i].description}</td>
                    <td>{new Date(this.state.scenarios[i].createdDateTime).toLocaleDateString()} {new Date(this.state.scenarios[i].createdDateTime).toLocaleTimeString()}</td>
                    <td><button onClick={() => this.handleScenarioReplay(this.state.scenarios[i].data)}>Replay</button></td>
                    <td><button onClick={() => this.handleScenarioE2E(this.state.scenarios[i].data)}>E2E</button></td>
                </tr>);
            }
        }

        return (
            <div className="replay">
                <h1>Replay Timeline</h1>
                <button onClick={() => ReplayUtils.replay(this.state.pauseInMillis)}>Client Replay</button>
                <button onClick={() => ReplayUtils.e2e(this.state.pauseInMillis)}>E2E Replay</button>
                <button onClick={ACEController.downloadTimeline}>Download Scenario</button>
                <input type='file' accept='text/json' onChange={ReplayUtils.uploadTimeline}/>
                <label>Pause in Millis</label> <input type='text' onChange={this.changePauseInMillis}
                                                      value={this.state.pauseInMillis}/>

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

                <button onClick={() => ReplayUtils.saveScenario()}>Save Scenario</button>

                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>description</th>
                        <th>time</th>
                        <th/>
                        <th/>
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

