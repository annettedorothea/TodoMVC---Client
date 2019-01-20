import React from 'react';

export default class Spinner extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.loading) {
            return (
                <div className="spinner"/>
            );
        }
        return '';
    }
}

