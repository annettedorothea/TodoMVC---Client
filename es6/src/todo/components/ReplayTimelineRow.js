import React from 'react';
import TimelineCell from "./TimelineCell";
import ReplayUtils from "../../../app/ReplayUtils";

export default class ReplayTimelineRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            detailsVisibile: false
        };
        this.toggleDetailsVisibility = this.toggleDetailsVisibility.bind(this);
    }

    toggleDetailsVisibility() {
        const detailsVisibile = !this.state.detailsVisibile;
        this.setState({detailsVisibile: detailsVisibile});
    }

    compareItems() {
        return JSON.stringify(this.props.expectedItem, ReplayUtils.itemStringifyReplacer) === JSON.stringify(this.props.actualItem, ReplayUtils.itemStringifyReplacer);

    }

    render() {
        const className = this.compareItems() === false ? 'failure' : 'success';
        return (
            <tr className={className}>
                <td>
                    <TimelineCell item={this.props.expectedItem} detailsVisibile={this.state.detailsVisibile}
                                  toggleDetailsVisibility={this.toggleDetailsVisibility}/>
                </td>
                <td>
                    <TimelineCell item={this.props.actualItem} detailsVisibile={this.state.detailsVisibile}
                                  toggleDetailsVisibility={this.toggleDetailsVisibility}/>
                </td>
            </tr>
        );
    }
}

