class ReplayTimeline extends React.Component {

    constructor(props) {
        super(props);
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
                <button onClick={ReplayUtils.replay}>Client Replay</button>
                <button onClick={ReplayUtils.e2e}>E2E Replay</button>
                <button onClick={ACEController.downloadTimeline}>Download Scenario</button>
                <input type='file' accept='text/json' onChange={ReplayUtils.uploadTimeline}/>

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

