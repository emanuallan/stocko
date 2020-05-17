import { GET_STOCKS, DELETE_STOCK, EDIT_STOCK, GET_STOCK, CREATE_STOCK } from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
    console.log(state); // {}
    console.log(action); // {type: 'create_stock}, payload: undefined

    switch (action.type) {
        case GET_STOCKS:
            return {
                ...state,
                stocks: action.payload
            };
        case GET_STOCK:
            return {
                ...state,
                stock: action.payload
            };
        case CREATE_STOCK:
            return {
                ...state,
                stock: action.payload
            };
        case EDIT_STOCK:
            return {
                ...state,
                stock: action.payload
            };
        case DELETE_STOCK:
            // return _.omit(state, action.payload);
            return {
                ...state,
                delStock: action.payload
            };
        default:
            return state;
    }
}