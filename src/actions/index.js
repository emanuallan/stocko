import { GET_STOCKS, DELETE_STOCK, EDIT_STOCK, CREATE_STOCK } from './types';
import stockApi from '../api/stockApi';
import { message } from 'antd';

export const getStocks = (stocks) => {
    return {
        type: GET_STOCKS,
        payload: stocks
    }
}

export const deleteStock = (stock) => {
    return {
        type: DELETE_STOCK,
        payload: stock
    }
}

export const editStock = (stock) => {
    return {
        type: EDIT_STOCK,
        payload: stock
    }
}

export const createStock = (newStock) => {
    return async (dispatch, getState) => {

        try {
            const response = await stockApi.get(`/quote?symbol=${newStock.stockSymbol}&token=bqvf2v7rh5rdj4egrjv0`);
            const response2 = await stockApi.get(`/stock/profile2?symbol=${newStock.stockSymbol}&token=bqvf2v7rh5rdj4egrjv0`);

            const createdStock = {
                stockSymbol: newStock.stockSymbol,
                cps: Number((newStock.cps).toFixed(2)),
                quantity: newStock.quantity,
                profit: Number(((response.data.c * newStock.quantity) - (newStock.cps * newStock.quantity)).toFixed(2)),
                cpps: Number((response.data.c).toFixed(2)),
                difference: Number(((response.data.c - newStock.cps)).toFixed(2)),
                currentEquity: Number(((response.data.c * newStock.quantity)).toFixed(2)),
                companyName: response2.data.name,
                companyLogo: response2.data.logo
            }


            dispatch({
                type: CREATE_STOCK,
                payload: createdStock
            });
        } catch (error) {
            message.error(error.response)
        }
    }
}

