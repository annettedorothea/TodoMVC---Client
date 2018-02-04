import React from 'react';

export default class ErrorMessage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.error) {
            return (
                <pre className="error">{this.props.error}</pre>
            );
        }
        return '';
    }
}

