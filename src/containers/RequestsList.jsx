import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { CircularProgress } from '@rmwc/circular-progress';
import {
    Card,
    CardActions,
    CardActionButtons,
    CardActionButton
} from '@rmwc/card';
import {
    List,
    ListItem,
    ListItemText,
    ListItemGraphic,
    ListDivider
} from '@rmwc/list';

import selectors from '../redux/selectors';
import actions from '../redux/actions';

class RequestsList extends Component {
    static propTypes = {
        requests: PropTypes.array.isRequired,
        clearRequestsAction: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.handleRequestClick = this.handleRequestClick.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
    }

    handleRequestClick(request) {
        const { history } = this.props;

        history.push(`/requests/${request.get('params').hashCode()}`);
    }

    handleAddClick() {
        const { history } = this.props;

        history.push(`/requests/add`);
    }

    handleClearClick() {
        const { clearRequestsAction } = this.props;

        clearRequestsAction();
    }

    render() {
        const { requests } = this.props;

        return (
            <Card outlined>
                <CardActions>
                    <CardActionButtons>
                        <CardActionButton
                            icon="add"
                            raised
                            onClick={() => this.handleAddClick()}
                        >
                            Add Request
                        </CardActionButton>
                    </CardActionButtons>
                </CardActions>
                <ListDivider />
                <List>
                    {requests.length === 0 ? (
                        <ListItem disabled>
                            <ListItemGraphic icon="info" />
                            <ListItemText>No Active Requests</ListItemText>
                        </ListItem>
                    ) : null}
                    {requests.map((request, index) => (
                        <ListItem
                            key={index}
                            onClick={() => this.handleRequestClick(request)}
                        >
                            {request.get('isPending') === false ? (
                                <ListItemGraphic icon="done" />
                            ) : (
                                <ListItemGraphic icon={<CircularProgress />} />
                            )}

                            <ListItemText>{request.getIn(['params', 'url'])}</ListItemText>
                        </ListItem>
                    ))}
                </List>
                {requests.length > 0 ? (
                    <>
                        <ListDivider />
                        <CardActions>
                            <CardActionButtons>
                                <CardActionButton
                                    icon="clear"
                                    onClick={() => this.handleClearClick()}
                                >
                                    Clear
                                </CardActionButton>
                            </CardActionButtons>
                        </CardActions>
                    </>
                ) : null}
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    requests: selectors.getRequests(state)
});

const mapDispatchToProps = dispatch => ({
    clearRequestsAction: () => dispatch(actions.clearRequests())
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RequestsList)
);
