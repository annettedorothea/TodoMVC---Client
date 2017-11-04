import React from 'react';

export default class TimelineCell extends React.Component {

    constructor(props) {
        super(props);
    }

    abstractText() {
        const item = this.props.item;
        if (item === undefined) {
            return "undefined";
        }
        if (item === null) {
            return "---";
        }
        if (item.action) {
            return "A " + item.action.actionName;
        }
        if (item.command) {
            return "C " + item.command.commandName;
        }
        if (item.event) {
            const triggerActionName = item.event.eventName === 'TriggerAction' ? " " + item.event.eventParam.actionName : "";
            return "E " + item.event.eventName + triggerActionName;
        }
        return "---";
    }

    render() {
        const item = this.props.item;
        return (
            <div>
                <a onClick={this.props.toggleDetailsVisibility}>{this.abstractText()}</a>
                {
                    this.props.detailsVisibile &&
                    <pre>{JSON.stringify(item, ReplayUtils.itemStringifyReplacer, 2)}</pre>
                }
            </div>
        );
    }
}

