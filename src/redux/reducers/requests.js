import React from 'react';
import { Record, OrderedMap } from 'immutable';
import * as actionTypes from '../actionTypes';
import SnackbarService from '../../services/Snackbar';

export const ParamsRecord = Record({
    url: null,
    param1: null,
    param2: null,
    param3: null,
    param4: null
});

export const RequestRecord = Record({
    params: ParamsRecord(),
    isPending: false,
    isError: false,
    response: null
});

const Model = Record({
    requests: OrderedMap()
});

const initialState = Model();

const RequestsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_REQUEST.PENDING:
            return state.withMutations(mutant => {
                SnackbarService.notify({
                    title: <b>Request Created</b>,
                    icon: 'add_circle'
                });
                mutant.update('requests', requests =>
                    requests.set(
                        String(action.meta.hashCode()),
                        new RequestRecord({
                            params: action.meta,
                            isPending: true
                        })
                    )
                );
            });
        case actionTypes.CREATE_REQUEST.FULFILLED:
            return state.withMutations(mutant => {
                if (
                    !mutant
                        .get('requests')
                        .has(String(action.meta.hashCode()))
                ) {
                    return;
                }

                SnackbarService.notify({
                    title: <b>Request Ready!</b>,
                    body: action.meta.get('url'),
                    icon: 'done'
                });

                mutant.updateIn(
                    ['requests', String(action.meta.hashCode())],
                    request =>
                        request
                            .set('response', action.payload)
                            .set('isPending', false)
                );
            });
        case actionTypes.CLEAR_REQUESTS:
            return initialState;
        case actionTypes.REMOVE_REQUEST:
            return state.withMutations(mutant => {
                if (!mutant.get('requests').has(String(action.payload))) {
                    return;
                }

                mutant.update('requests', requests =>
                    requests.delete(String(action.payload))
                );

                SnackbarService.notify({
                    title: <b>Request Cleared</b>,
                    icon: 'clear'
                });
            });
        default:
            return state;
    }
};

export default RequestsReducer;
