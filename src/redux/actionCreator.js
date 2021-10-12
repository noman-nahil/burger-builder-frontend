import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addIngredient = igtype => {
    return {
        type: actionTypes.ADD_INGREDIENT, //Redux type
        payload: igtype
    }
}
export const removeIngredient = igtype => {
    return {
        type: actionTypes.REMOVE_INGREDIENT, //Redux type
        payload: igtype
    }
}

export const updatePurchasable = () => {
    return {
        type: actionTypes.UPDATE_PURCHASABLE,
    }
}
export const resetIngredients = () => {
    return {
        type: actionTypes.RESET_INGREDIENTS,
    }
}

export const loadOrders = orders => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: orders
    }
}
export const orderLoadFailed = () => {
    return {
        type: actionTypes.ORDER_LOAD_FAILED
    }
}
export const fetchOrders = (token, userId) => dispatch => {
    const queryParam = '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('https://burger-builder-e5858-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?auth=' + token + queryParam)
        .then(response => {
            dispatch(loadOrders(response.data))
        })
        .catch(err => {
            dispatch(orderLoadFailed());
        })

}