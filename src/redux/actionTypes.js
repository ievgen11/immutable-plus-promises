import { createActionType, createPromiseTypes } from './lib';

export const CREATE_REQUEST = createPromiseTypes([], 'CREATE_REQUEST');
export const REMOVE_REQUEST = createActionType([], 'REMOVE_REQUEST');
export const CLEAR_REQUESTS = createActionType([], 'CLEAR_REQUESTS');
