import React, { Component } from 'react';

import RequestForm from '../containers/RequestForm';

export default class extends Component {
    render() {
        return (
            <div className="page">
                <section className="section">
                    <RequestForm />
                </section>
            </div>
        );
    }
}
