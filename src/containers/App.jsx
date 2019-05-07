import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SnackbarQueue } from '@rmwc/snackbar';

import SnackbarService from '../services/Snackbar';

class App extends Component {
    render() {
        return (
            <>
                <SnackbarQueue
                    messages={SnackbarService.messages}
                    timeout={1000}
                />
                {this.props.children}
            </>
        );
    }
}

export default withRouter(connect()(App));
