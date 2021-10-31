import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionType from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';   

export function* watchAuth() {
    yield all([
        takeEvery(actionType.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionType.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionType.AUTH_USER, authUserSaga),
        takeEvery(actionType.AUTH_CHECK_STATE, authCheckStateSaga)  
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionType.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    yield takeLatest(actionType.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionType.FETCH_ORDERS, fetchOrdersSaga);
}