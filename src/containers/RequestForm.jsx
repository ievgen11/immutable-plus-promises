import React, { Component } from 'react';
import { finance, internet, system } from 'faker';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import { Card, CardActions, CardActionButton } from '@rmwc/card';

import actions from '../redux/actions';
import { ParamsRecord } from '../redux/reducers/requests';

class RequestForm extends Component {
    static propTypes = {
        createRequestAction: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = new ParamsRecord({
            url: `${internet.url()}/${system.commonFileName()}`,
            param1: finance.iban(),
            param2: finance.account(),
            param3: finance.amount(),
            param4: finance.bitcoinAddress()
        }).toObject();
    }

    handleBackClick() {
        const { history } = this.props;

        history.push(`/requests`);
    }

    handleSubmit(event) {
        const { createRequestAction, history } = this.props;
        event.preventDefault();

        const record = new ParamsRecord(this.state);

        createRequestAction(record);

        history.push(`/requests/${record.hashCode()}`);
    }

    handleInputChange(evt) {
        const { target } = evt;
        this.setState(() => ({ [target.getAttribute('name')]: target.value }));
    }

    render() {
        return (
            <Card outlined>
                <CardActions fullBleed>
                    <CardActionButton
                        label="Back to list"
                        icon="arrow_back"
                        onClick={this.handleBackClick}
                    />
                </CardActions>
                <form
                    onSubmit={this.handleSubmit}
                    style={{ display: 'flex', flexDirection: 'column' }}
                >
                    {Object.entries(this.state)
                        .map(([name, value]) => ({ name, value }))
                        .map((param, index) => (
                            <TextField
                                key={index}
                                label={param.name.toUpperCase()}
                                value={String(param.value)}
                                name={param.name}
                                onChange={evt => this.handleInputChange(evt)}
                            />
                        ))}
                    <Button raised>Create</Button>
                </form>
            </Card>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => ({
    createRequestAction: (url, params) =>
        dispatch(actions.createRequest(url, params))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RequestForm)
);
