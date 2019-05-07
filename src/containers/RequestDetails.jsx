import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField } from '@rmwc/textfield';
import { LinearProgress } from '@rmwc/linear-progress';
import JSONTree from 'react-json-tree';
import { Typography } from '@rmwc/typography';
import {
    Card,
    CardActions,
    CardActionButton,
    CardActionButtons
} from '@rmwc/card';
import { ListDivider } from '@rmwc/list';

import selectors from '../redux/selectors';
import actions from '../redux/actions';

class RequestDetails extends Component {
    static propTypes = {
        hash: PropTypes.string.isRequired,
        params: PropTypes.array.isRequired,
        isPending: PropTypes.bool.isRequired,
        response: PropTypes.any,
        isHashValid: PropTypes.bool.isRequired,
        removeRequestAction: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
    }

    handleBackClick() {
        const { history } = this.props;

        history.push(`/requests`);
    }

    handleClearClick() {
        const { removeRequestAction, hash, history } = this.props;

        removeRequestAction(hash);
        history.push(`/requests`);
    }

    componentDidMount() {
        const { isHashValid, history } = this.props;

        if (!isHashValid) {
            history.push(`/requests`);
        }
    }

    render() {
        const { params, isPending, response } = this.props;

        return (
            <Card outlined>
                <CardActions fullBleed>
                    <CardActionButton
                        label="Back to list"
                        icon="arrow_back"
                        onClick={this.handleBackClick}
                    />
                </CardActions>
                <ListDivider />
                {isPending ? <LinearProgress /> : null}
                {response !== null ? (
                    <Typography
                        use="subtitle1"
                        tag="div"
                        style={{ padding: '0.5rem 1rem' }}
                        theme="textSecondaryOnBackground"
                    >
                        <JSONTree
                            invertTheme
                            data={response}
                            theme={{
                                base00: '#000000',
                                base01: '#303030',
                                base02: '#505050',
                                base03: '#b0b0b0',
                                base04: '#d0d0d0',
                                base05: '#e0e0e0',
                                base06: '#f5f5f5',
                                base07: '#ffffff',
                                base08: '#325D79',
                                base09: '#9BD7D1',
                                base0A: '#F26627',
                                base0B: '#325D79',
                                base0C: '#F9A26C',
                                base0D: '#F9A26C',
                                base0E: '#325D79',
                                base0F: '#9BD7D1'
                            }}
                        />
                    </Typography>
                ) : null}
                {params.map((param, index) => (
                    <TextField
                        key={index}
                        disabled
                        label={param.name.toUpperCase()}
                        value={String(param.value)}
                    />
                ))}
                <CardActions fullBleed>
                    <CardActionButtons>
                        <CardActionButton
                            icon="clear"
                            onClick={() => this.handleClearClick()}
                        >
                            Clear
                        </CardActionButton>
                    </CardActionButtons>
                </CardActions>
            </Card>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    params: selectors.getRequestParams(state, ownProps.hash),
    isPending: selectors.getRequestIsPending(state, ownProps.hash),
    response: selectors.getRequestResponse(state, ownProps.hash),
    isHashValid: selectors.getIsHashValid(state, ownProps.hash)
});

const mapDispatchToProps = dispatch => ({
    removeRequestAction: hash => dispatch(actions.removeRequest(hash))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RequestDetails)
);
