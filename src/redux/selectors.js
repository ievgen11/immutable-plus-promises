import { OrderedMap } from 'immutable';

export const getRequests = store => store.requests.get('requests').toArray();
export const getRequestIsPending = (store, hash) =>
    store.requests.getIn(['requests', hash, 'isPending'], false);
export const getRequestResponse = (store, hash) =>
    store.requests.getIn(['requests', hash, 'response'], {});
export const getRequestParams = (store, hash) =>
    Object.entries(
        store.requests
            .getIn(['requests', hash, 'params'], OrderedMap())
            .toObject()
    ).map(([name, value]) => ({ name, value }));
export const getIsHashValid = (store, hash) =>
    store.requests.get('requests').has(hash);

export default {
    getRequests,
    getRequestParams,
    getRequestIsPending,
    getRequestResponse,
    getIsHashValid
};
