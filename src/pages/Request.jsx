import React, { Component } from 'react';

import RequestDetails from '../containers/RequestDetails';

export default class extends Component {
    render() {
        const { hash } = this.props.match.params;
        return (
            <div className="page">
                <section className="section">
                    <RequestDetails hash={hash} />
                </section>
            </div>
        );
    }
}
