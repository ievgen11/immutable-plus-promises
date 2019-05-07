import React, { Component } from 'react';
import { Typography } from '@rmwc/typography';

import RequestsList from '../containers/RequestsList';

export default class extends Component {
    render() {
        return (
            <div className="page">
                <section className="section" style={{ marginTop: '5rem' }}>
                    <Typography use="headline2">Immutable.js + Promises</Typography>
                </section>
                <section className="section">
                    <Typography use="headline5">Using Immutable.js to identify items in the Redux store</Typography>
                </section>
                <section className="section">
                    <RequestsList />
                </section>
            </div>
        );
    }
}
