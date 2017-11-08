import React from 'react';
import ReplayTimelineRow from "./ReplayTimelineRow";
import ReplayUtils from "../app/ReplayUtils";
import ACEController from "../../gen/ace/ACEController";

export default class ReplayTimeline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pauseInMillis: 500
        };
        this.changePauseInMillis = this.changePauseInMillis.bind(this);
    }

    changePauseInMillis(event) {
        this.setState({
            pauseInMillis: event.target.value
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
        return (
            <div className="replay">
                <h1>Replay Timeline</h1>
                <button onClick={() => ReplayUtils.replay(this.state.pauseInMillis)}>Client Replay</button>
                <button onClick={() => ReplayUtils.e2e(this.state.pauseInMillis)}>E2E Replay</button>
                <button onClick={ACEController.downloadTimeline}>Download Scenario</button>
                <input type='file' accept='text/json' onChange={ReplayUtils.uploadTimeline}/>
                <label>Pause in Millis</label> <input type='text' onChange={this.changePauseInMillis} value={this.state.pauseInMillis}/>

                <table>
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

