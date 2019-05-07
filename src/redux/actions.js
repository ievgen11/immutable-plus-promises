import { CREATE_REQUEST, REMOVE_REQUEST, CLEAR_REQUESTS } from './actionTypes';
import DBService from '../services/DBService';

export const createRequest = paramsRecord => dispatch =>
    dispatch({
        type: CREATE_REQUEST.TYPE,
        payload: DBService.generateData(),
        meta: paramsRecord
    });

export const removeRequest = hash => dispatch =>
    dispatch({
        type: REMOVE_REQUEST,
        payload: hash
    });

export const clearRequests = () => dispatch =>
    dispatch({
        type: CLEAR_REQUESTS
    });

export default {
    createRequest,
    removeRequest,
    clearRequests
};
