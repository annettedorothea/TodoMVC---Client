import React from 'react';

export default class Spinner extends React.Component {

    render() {
        if (this.props.loading) {
            return (
                <div className="spinner"/>
            );
        }
        return '';
    }
}

