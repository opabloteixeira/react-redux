import { AxiosResponse } from 'axios';
import { all, select, takeLatest, call, put } from 'redux-saga/effects';

import { IState } from '../..';
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from './actions';
import api from '../../../services/api';
import { ActionTypes } from './types';

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse {
   id: number;
   quantity: number;
}


function* checkProductStock({ payload }: CheckProductStockRequest) {
   const { product } = payload;

   const currentQuantity: number = yield select((state: IState) => {
      return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0;
   })

   const avalableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`);

   if (avalableStockResponse.data.quantity > currentQuantity) {
      yield put(addProductToCartSuccess(product));
      console.log('deu certo');
   } else {
      yield put(addProductToCartFailure(product.id))
      console.log('falta estoque');
   }
}


export default all([
   takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)
]);