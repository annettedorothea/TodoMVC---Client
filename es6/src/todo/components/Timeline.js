import React from 'react';
import TimelineRow from "./TimelineRow";

export default class Timeline extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const items = this.props.timeline ? this.props.timeline.map((item, i) => {
            return <TimelineRow key={i} item={item}/>
        }) : [];
        return (
            <div className="timeline">
                <h1>Timeline</h1>
                <table>
                    <thead>
                    <tr>
                        <th>item</th>
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

