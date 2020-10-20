import { AxiosResponse } from 'axios';
import { all, select, takeLatest, call } from 'redux-saga/effects';

import { IState } from '../..';
import { addProductToCartRequest } from './actions';
import api from '../../../services/api';

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse {
   id: number;
   quantity: number;
}


function* checkProductStock({ payload }: CheckProductStockRequest){
   const { product } = payload;

   const currentQuantity: number = yield select((state: IState) => {
      return state.cart.items.find( item => item.product.id === product.id)?.quantity ?? 0;
   })

   const avalableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`);


   if(avalableStockResponse.data.quantity > currentQuantity) {
      console.log('deu certo');
   }else{
      console.log('falta estoque');
   }
}


export default all([
   takeLatest('ADD_PRODUCT_TO_CART_REQUEST', checkProductStock)
]);